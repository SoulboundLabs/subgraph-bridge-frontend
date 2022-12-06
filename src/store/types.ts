import { ReactNode } from "react";
import { Icon } from "tabler-icons-react";

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

export interface Option<T> {
  value: T;
  label: string | ReactNode;
  type?: string;
  icon?: ReactNode;
  Icon?: Icon;
  imgSrc?: string;
  comingSoon?: boolean;
  description?: string | ReactNode;
}

export type Size = "xs" | "sm" | "md" | "lg" | "xl";
