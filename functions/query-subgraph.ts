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
  const url = `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/Cjv3tykF4wnd6m9TRmQV7weiLjizDnhyt6x2tTJB42Cy`;

  const hashResponse = await executeQuery(url, latestBlockHashQuery);
  const hashJson = await hashResponse.json();
  const { hash } = hashJson.data._meta.block;

  console.log("hash", hash);
  console.log("query", query);
  const completeQuery = query.replace('hash: ""', `hash: "${hash}"`);
  const completeResponse = await executeQuery(url, completeQuery);
  const completeJson = await completeResponse.json();
  const graphAttestation = completeResponse.headers.get(
    "graph-attestation"
  ) as string;

  console.log("graphAttestation", graphAttestation);
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
    hash,
  });

  return new Response(responseBody, init);
}
