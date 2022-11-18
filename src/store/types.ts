export interface SubgraphBridge {
  id: string;
  config: SubgraphBridgeConfig;
  totalAttestations: number;
  chainId: number;
  totalSlashableGRT: number;
}

export interface SubgraphBridgeConfig {
  queryFirstChunk: string;
  querySecondChunk: string;
  responseDataOffset: number;
  responseDataType: string;
  subgraphDeploymentID: string;
  proposalFreezePeriod: number;
  minimumSlashableGRT: number;
  disputeResolutionWindow: number;
}
