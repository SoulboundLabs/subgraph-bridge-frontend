import { gql, useQuery } from "urql";
import { formatGraphQL } from "../Code/CodeEditor";
import { encodeBase58 } from "../lib/hex";
import { SubgraphBridge } from "../store/types";
import { BridgeItem } from "./BridgeItem";

const SubgraphBridgeCreationQuery = gql`
  query {
    subgraphBridgeCreations {
      id
      bridgeCreator
      subgraphBridgeId
      subgraphDeploymentID
      queryFirstChunk
      queryLastChunk
    }
  }
`;

const parseSubgraphBridge = (subgraphBridge: SubgraphBridge) => {
  const gatewayQuery =
    subgraphBridge.queryFirstChunk + subgraphBridge.queryLastChunk;

  const queryPrefix = '{"query":"';
  const variablesSuffix = '}}","variables":{}}';

  const fullQuery = gatewayQuery
    .slice(queryPrefix.length, -variablesSuffix.length)
    .replaceAll(/n|\\/g, "")
    .replace(/""/, '""');

  return {
    ...subgraphBridge,
    fullQuery: formatGraphQL(fullQuery),
    subgraphDeploymentID: encodeBase58(subgraphBridge.subgraphDeploymentID),
  };
};

export const BridgeList = ({ setSelectedBridge }) => {
  const [result] = useQuery({
    query: SubgraphBridgeCreationQuery,
  });

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <div className="divide-y divide-slate-500 border-b border-slate-500">
      {data.subgraphBridgeCreations
        .map(parseSubgraphBridge)
        .map((bridge, idx) => (
          <BridgeItem
            setSelectedBridge={setSelectedBridge}
            key={bridge.id}
            bridge={bridge}
            idx={idx}
          />
        ))}
    </div>
  );
};
