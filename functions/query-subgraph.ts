import { ethers } from "ethers";

export async function onRequestPost({ request, env }) {
  const { query, subgraphDeploymentID } = await request.json();

  try {
    if (!query) {
      throw new Error("No query provided");
    }

    if (!subgraphDeploymentID) {
      throw new Error("No subgraph deployment ID provided");
    }

    return await querySubgraph(query, subgraphDeploymentID, env.VITE_GRAPH_API_KEY);
  } catch (e) {
    console.log(e);
    return new Response(e);
  }
}

const latestBlockHashQuery = `
    {
    _meta {
      block {
        hash
        number
      }
    }
  }
`;

const executeQuery = async (url: string, query: string) => {
  const config = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  };
  console.log(url, config);
  return fetch(url, config);
};

export async function querySubgraph(query: string, subgraphDeploymentID: string, apiKey: string) {
  try {
    const url = `https://gateway.testnet.thegraph.com/api/${apiKey}/deployments/id/${subgraphDeploymentID}`;

    const hashResponse = await executeQuery(url, latestBlockHashQuery);
    const hashJson = await hashResponse.json();
    console.log("~~~", hashJson);
    const { hash, number } = hashJson.data._meta.block;

    const completeQuery = query.replace('hash: ""', `hash: "${hash}"`);
    console.log("COMPLETE QUERY: ", completeQuery);
    const completeResponse = await executeQuery(url, completeQuery);
    const completeJson = await completeResponse.json();
    const graphAttestation = completeResponse.headers.get("graph-attestation") as string;

    const attestation = JSON.parse(graphAttestation);

    const { requestCID, responseCID, r, s, v } = attestation;
    // @dev taking the subgraphDeploymentID from the attestation outside because we have another subgraphDeploymentID in this block
    const _subgraphDeploymentID = attestation.subgraphDeploymentID;

    const attestationData = ethers.utils.solidityPack(
      ["bytes32", "bytes32", "bytes32", "bytes32", "bytes32", "uint8"],
      [requestCID, responseCID, _subgraphDeploymentID, r, s, v]
    );

    const init = {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    };

    const responseBody = JSON.stringify({
      data: completeJson,
      attestationData,
      blockHash: hash,
      blockNumber: number,
    });

    return new Response(responseBody, init);
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
}
