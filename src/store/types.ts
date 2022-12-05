export interface SubgraphBridge {
  id: string;
  queryFirstChunk: string;
  queryLastChunk: string;
  responseDataOffset: number;
  responseDataType: string;
  subgraphDeploymentID: string;
  proposalFreezePeriod: number;
  minimumSlashableGRT: number;

  fullQuery: string;

  totalAttestations: number;
  chainId: number;
  totalSlashableGRT: number;
}

export enum Status {
  Frozen = "Frozen",
  Pending = "Pending",
  Certified = "Certified",
  Disputed = "Disputed",
}
