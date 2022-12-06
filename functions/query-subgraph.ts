import { ethers } from "ethers";

export async function onRequestPost({ request, env }) {
  const { query, subgraphDeploymentID } = await request.json();
  return await querySubgraph(query, subgraphDeploymentID);
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
  return fetch(url, config);
};

export async function querySubgraph(
  query: string,
  subgraphDeploymentID: string
) {
  const apiKey = "6c768ea8853128ba36dc7c405c20b37d";
  const url = `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/${subgraphDeploymentID}}`;

  const hashResponse = await executeQuery(url, latestBlockHashQuery);
  const hashJson = await hashResponse.json();
  const { hash, number } = hashJson.data._meta.block;

  const completeQuery = query.replace('hash: ""', `hash: "${hash}"`);
  const completeResponse = await executeQuery(url, completeQuery);
  const completeJson = await completeResponse.json();
  const graphAttestation = completeResponse.headers.get(
    "graph-attestation"
  ) as string;

  const attestationBytes = ethers.utils.hexlify(
    ethers.utils.toUtf8Bytes(graphAttestation)
  );

  const init = {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  };

  const responseBody = JSON.stringify({
    data: completeJson,
    attestationBytes,
    blockHash: hash,
    blockNumber: number,
  });

  return new Response(responseBody, init);
}
