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

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const subgraphResponseAddedData = data.subgraphResponseAddeds;

  return (
    <>
      <div className="mt-6">
        <Container>
          <BridgeProposalTable data={subgraphResponseAddedData} />
        </Container>
      </div>
    </>
  );
};
