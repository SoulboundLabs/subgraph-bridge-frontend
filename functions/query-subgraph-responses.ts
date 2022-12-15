import { executeQuery } from "./query-subgraph";

export async function onRequestPost({ request, env }) {
  const { query, subgraphDeploymentID } = await request.json();

  try {
    if (!query) {
      throw new Error("No query provided");
    }

    if (!subgraphDeploymentID) {
      throw new Error("No subgraph deployment ID provided");
    }

    return await getSubgraphResponses(env.VITE_GRAPH_API_KEY);
  } catch (e) {
    console.log(e);
    return new Response(e);
  }
}

export const subgraphResponseAddedQuery = `
  {
    subgraphResponseAddeds{
      queryBridger
      subgraphBridgeID
    }
  }
`;

export async function getSubgraphResponses(apiKey: string) {
  //TODO: get subgraph deployment id from env for now just hardcode
  const url = `https://api.studio.thegraph.com/query/13658/subgraphbridge/0.69`;
  const response = await executeQuery(url, subgraphResponseAddedQuery);
  console.log(response);
  const json = await response.json();
}
