import { useState } from "react";
import { Plus } from "tabler-icons-react";
import { BridgeForm } from "../BridgeForm/BridgeForm";
import { Button } from "../Button/Button";
import { Header } from "../Header/Header";
import { Panel } from "../Layout/Panel";
import { SubgraphBridgeList } from "./SubgraphBridgeList";

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
        title={
          <div className="flex gap-2 items-center text-white">
            <span className="text-2xl font-bold leading-7">
              Deployed Bridges
            </span>{" "}
            <Button size="sm" label={7} />
          </div>
        }
      />
      <div className="mt-6">
        <SubgraphBridgeList />
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
