import { gql, useQuery } from "urql";
import { BridgeItem } from "./BridgeItem";

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

export const BridgeList = () => {
  const [result] = useQuery({
    query: SubgraphBridgeCreationQuery,
  });

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <div className="divide-y divide-slate-500">
      {data.subgraphBridgeCreations.map((bridge, idx) => (
        <BridgeItem key={bridge.id} bridge={bridge} idx={idx} />
      ))}
    </div>
  );
};