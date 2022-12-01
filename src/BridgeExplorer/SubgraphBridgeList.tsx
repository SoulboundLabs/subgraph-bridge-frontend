import { gql, useQuery } from "urql";
import { SubgraphBridgeItem } from "./SubgraphBridgeItem";

const SubgraphBridgeCreationQuery = gql`
  query {
    subgraphBridgeCreations {
      id
      bridgeCreator
      subgraphBridgeId
      subgraphDeploymentID
    }
  }
`;

export const SubgraphBridgeList = () => {
  const [result] = useQuery({
    query: SubgraphBridgeCreationQuery,
  });

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <div className="divide-y divide-slate-500 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-500">
      {data.subgraphBridgeCreations.map((bridge) => (
        <SubgraphBridgeItem key={bridge.id} bridge={bridge} />
      ))}
    </div>
  );
};
