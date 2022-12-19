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
  const [selectedBridge, setSelectedBridge] = useState(null);

  return (
    <>
      <Header
        cta={<Button label={"Create Bridge"} palette="secondary" Icon={Plus} onClick={() => setBridgeFormOpen(true)} reverse />}
        breadcrumbs={["Subgraph Bridge Explorer"]}
      />
      <div className="">
        <BridgeList setSelectedBridge={setSelectedBridge} />
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
        description={"Use the form below to post on-chain data from the most recent indexed block."}
        open={!!selectedBridge}
        setOpen={setSelectedBridge}
      >
        <ResponseForm bridge={selectedBridge} handleCancel={() => setSelectedBridge(null)} />
      </Panel>
    </>
  );
};
