import axios from "axios";

export const executeLatestQueryTemplate = async (query: string, subgraphDeploymentID: string) => {
  const response = await axios({
    url: "/query-subgraph",
    method: "post",
    data: {
      query,
      subgraphDeploymentID,
    },
  });

  return response.data;
};
