import { SubgraphBridge } from "../store/types";
import { SubgraphBridgeItem } from "./SubgraphBridgeItem";

const mockBridge: SubgraphBridge = {
  id: "1",
  totalAttestations: 3,
  chainId: 5,
  totalSlashableGRT: 100000,
  config: {
    queryFirstChunk: "queryFirstChunk",
    querySecondChunk: "querySecondChunk",
    responseDataOffset: 5,
    responseDataType: "responseDataType",
    subgraphDeploymentID: "subgraphDeploymentID",
    proposalFreezePeriod: 1,
    minimumSlashableGRT: 1,
    disputeResolutionWindow: 1,
  },
};

const mockBridges = [mockBridge, mockBridge, mockBridge, mockBridge];

export const SubgraphBridgeList = () => {
  return (
    <ol className="grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
      {mockBridges.map((bridge) => (
        <SubgraphBridgeItem key={bridge.id} bridge={bridge} />
      ))}
    </ol>
  );
};
