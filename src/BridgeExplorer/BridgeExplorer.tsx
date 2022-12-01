import { useState } from "react";
import { Plus } from "tabler-icons-react";
import { BridgeForm } from "../BridgeForm/BridgeForm";
import { Button } from "../Button/Button";
import { Header } from "../Header/Header";
import { Panel } from "../Layout/Panel";
import { BridgeList } from "./BridgeList";

export const BridgeExplorer = () => {
  let [open, setOpen] = useState(false);

  return (
    <>
      <Header
        cta={
          <Button
            label={"Create Bridge"}
            palette="secondary"
            Icon={Plus}
            onClick={() => setOpen(true)}
            reverse
          />
        }
        breadcrumbs={["Subgraph Bridge Explorer"]}
      />
      <div className="">
        <BridgeList />
      </div>
      <Panel
        title="Create Subgraph Bridge"
        description={"Use the form below to configure a new Subgraph Bridge."}
        open={open}
        setOpen={setOpen}
      >
        <BridgeForm handleCancel={() => setOpen(false)} />
      </Panel>
    </>
  );
};
