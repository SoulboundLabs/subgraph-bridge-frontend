import { useEffect, useMemo, useState } from "react";
import { gql, useQuery } from "urql";
import { useBlockNumber } from "wagmi";
import { encodeBase58 } from "../lib/hex";
import { SubgraphBridge } from "../store/types";
import { BridgeItem } from "./BridgeItem";

const SubgraphBridgeCreationQuery = gql`
  query {
    subgraphBridgeCreations {
      bridgeCreator
      subgraphBridgeId
      subgraphDeploymentID
      queryFirstChunk
      queryLastChunk
      minimumSlashableGRT
      proposalFreezePeriod
    }
  }
`;

const parseSubgraphBridge = (subgraphBridge: SubgraphBridge) => {
  const gatewayQuery = subgraphBridge.queryFirstChunk + subgraphBridge.queryLastChunk;

  const queryPrefix = '{"query":"';
  const variablesSuffix = '}}","variables":{}}';

  const fullQuery = gatewayQuery.slice(queryPrefix.length, -variablesSuffix.length).replaceAll(/\\n/g, "").replaceAll(/\\/g, "").replace(/""/, '""');

  return {
    ...subgraphBridge,
    fullQuery,
    subgraphDeploymentID: encodeBase58(subgraphBridge.subgraphDeploymentID),
  };
};

export const BridgeList = ({ setSelectedBridge }) => {
  const [result, reexecuteQuery] = useQuery({
    query: SubgraphBridgeCreationQuery,
  });

  useBlockNumber({
    staleTime: 1000,
    onBlock: () => {
      console.log("Reexecuting query");
      console.log(reexecuteQuery);
    },
  });

  const { data, fetching, error } = result;
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <div className="divide-y divide-slate-500 border-b border-slate-500">
      {data.subgraphBridgeCreations.map(parseSubgraphBridge).map((bridge, idx) => (
        <BridgeItem setSelectedBridge={setSelectedBridge} key={bridge.id} bridge={bridge} idx={idx} />
      ))}
    </div>
  );
};
