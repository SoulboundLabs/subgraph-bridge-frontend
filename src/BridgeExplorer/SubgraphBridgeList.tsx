import { SubgraphBridge } from "../store/types";
import { SubgraphBridgeItem } from "./SubgraphBridgeItem";

const mockBridge: SubgraphBridge = {
  id: "1",
  totalAttestations: 3,
  chainId: 5,
  totalSlashableGRT: 100000,
  config: {
    queryFirstChunk: "queryFirstChunk",
    queryLastChunk: "queryLastChunk",
    responseDataOffset: 5,
    responseDataType: "responseDataType",
    subgraphDeploymentID: "subgraphDeploymentID",
    proposalFreezePeriod: 1,
    minimumSlashableGRT: 1,
  },
};

const mockBridges = [mockBridge, mockBridge, mockBridge, mockBridge];

export const SubgraphBridgeList = () => {
  return (
    <div className="divide-y divide-slate-500 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-500">
      {mockBridges.map((bridge) => (
        <SubgraphBridgeItem key={bridge.id} bridge={bridge} />
      ))}
    </div>
  );
};
