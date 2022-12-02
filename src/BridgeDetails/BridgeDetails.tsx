import { useState } from "react";
import { useParams } from "react-router-dom";
import { Plus } from "tabler-icons-react";
import { Button } from "../Button/Button";
import { Header } from "../Header/Header";
import { Panel } from "../Layout/Panel";
import { formatAddress } from "../lib/utils";
import { ResponseForm } from "../ResponseForm/ResponseForm";
import { BridgeProposalTable } from "./BridgeProposalTable";

export const BridgeDetails = () => {
  const [bridgeFormOpen, setBridgeFormOpen] = useState(false);
  const [responseFormOpen, setResponseFormOpen] = useState(null);
  const { id } = useParams();

  return (
    <>
      <Header
        cta={
          <Button
            label={"Create Bridge"}
            palette="secondary"
            Icon={Plus}
            onClick={() => setBridgeFormOpen(true)}
            reverse
          />
        }
        breadcrumbs={[
          "Subgraph Bridge Explorer",
          <span>{formatAddress(id)}</span>,
        ]}
      />
      <div className="">
        <BridgeProposalTable />
      </div>

      <Panel
        title="Submit Response"
        description={
          "Use the form below to submit a response to a Subgraph Bridge."
        }
        open={!!responseFormOpen}
        setOpen={setResponseFormOpen}
      >
        <ResponseForm
          subgraphBridgeID={responseFormOpen}
          handleCancel={() => setResponseFormOpen(null)}
        />
      </Panel>
    </>
  );
};
