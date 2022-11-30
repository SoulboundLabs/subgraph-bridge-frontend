export interface SubgraphBridge {
  id: string;
  config: SubgraphBridgeConfig;
  totalAttestations: number;
  chainId: number;
  totalSlashableGRT: number;
}

export interface SubgraphBridgeConfig {
  queryFirstChunk: string;
  queryLastChunk: string;
  responseDataOffset: number;
  responseDataType: string;
  subgraphDeploymentID: string;
  proposalFreezePeriod: number;
  minimumSlashableGRT: number;
  proposalFreezePeriod: number;
}
