import { useState } from "react";
import { Plus } from "tabler-icons-react";
import { BridgeForm } from "../BridgeForm/BridgeForm";
import { Button } from "../Button/Button";
import { Header } from "../Header/Header";
import { Panel } from "../Layout/Panel";
import { ResponseForm } from "../ResponseForm/ResponseForm";
import { BridgeList } from "./BridgeList";

export const BridgeExplorer = () => {
  const [bridgeFormOpen, setBridgeFormOpen] = useState(false);
  const [responseFormOpen, setResponseFormOpen] = useState(null);

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
        breadcrumbs={["Subgraph Bridge Explorer"]}
      />
      <div className="">
        <BridgeList setResponseFormOpen={setResponseFormOpen} />
      </div>
      <Panel
        title="Create Subgraph Bridge"
        description={"Use the form below to configure a new Subgraph Bridge."}
        open={bridgeFormOpen}
        setOpen={setBridgeFormOpen}
      >
        <BridgeForm handleCancel={() => setBridgeFormOpen(false)} />
      </Panel>
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
