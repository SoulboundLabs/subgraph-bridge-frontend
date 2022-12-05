import { useState } from "react";
import { useParams } from "react-router-dom";
import { gql } from "urql";
import { Container } from "../Layout/Container";
import { BridgeProposalTable } from "./BridgeProposalTable";

const SubgraphBridgeCreationQuery = gql`
  query ($subgraphBridgeId: String!) {
    subgraphBridgeCreation(id: $subgraphBridgeId) {
      id
      bridgeCreator
      subgraphBridgeId
      subgraphDeploymentID
    }
  }
`;

export const BridgeDetails = ({ bridge }) => {
  const [bridgeFormOpen, setBridgeFormOpen] = useState(false);
  const [selectedBridge, setSelectedBridge] = useState(null);
  const { id } = useParams();

  //   const [result] = useQuery({
  //     query: SubgraphBridgeCreationQuery,
  //     variables: { subgraphBridgeId: id },
  //   });

  //   const { data, fetching, error } = result;

  //   if (fetching) return <p>Loading...</p>;
  //   if (error) return <p>Oh no... {error.message}</p>;

  return (
    <>
      <div className="mt-6">
        <Container>
          <BridgeProposalTable />
        </Container>
      </div>
    </>
  );
};
