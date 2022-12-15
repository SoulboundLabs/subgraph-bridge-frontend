import { useState } from "react";
import { gql, useQuery } from "urql";
import { Container } from "../Layout/Container";
import { BridgeProposalTable } from "./BridgeProposalTable";

const SubgraphResponseAddedQuery = gql`
  query ($subgraphBridgeID: String!) {
    subgraphResponseAddeds(where: { subgraphBridgeID: $subgraphBridgeID }) {
      queryBridger
      subgraphDeploymentID
      subgraphBridgeID
      response
      blockNumber
      unlocksAt
      attestationData
      requestCID
    }
  }
`;

export const SubgraphDataCertifiedQuery = gql`
  {
    queryResultFinalizeds {
      requestCID
    }
  }
`;

export const BridgeDetails = ({ bridge }) => {
  const [bridgeFormOpen, setBridgeFormOpen] = useState(false);
  const [selectedBridge, setSelectedBridge] = useState(null);

  const [result] = useQuery({
    query: SubgraphResponseAddedQuery,
    variables: { subgraphBridgeID: bridge.subgraphBridgeId },
  });

  const [certifiedResult] = useQuery({
    query: SubgraphDataCertifiedQuery,
    variables: { requestCID: bridge.subgraphBridgeId },
  });

  const { data, fetching, error } = result;

  const { data: certifiedData, fetching: certifiedFetching, error: certifiedError } = certifiedResult;

  if (fetching || certifiedFetching) return <p>Loading...</p>;
  if (error || certifiedError) return <p>Oh no... {error.message || certifiedError.message}</p>;

  const subgraphResponseAddedData = data.subgraphResponseAddeds;

  return (
    <>
      <div className="mt-6">
        <Container>
          <BridgeProposalTable data={subgraphResponseAddedData} certifiedData={certifiedData} />
        </Container>
      </div>
    </>
  );
};
