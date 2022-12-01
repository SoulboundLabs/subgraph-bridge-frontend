import { useState } from "react";
import { useParams } from "react-router-dom";
import { Plus } from "tabler-icons-react";
import { BridgeForm } from "../BridgeForm/BridgeForm";
import { Button } from "../Button/Button";
import { Header } from "../Header/Header";
import { Panel } from "../Layout/Panel";

export const BridgeDetails = () => {
  let [open, setOpen] = useState(false);

  const { id } = useParams();

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
        breadcrumbs={["Bridge Explorer", id]}
      />
      <div className="mt-6">Hello</div>
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
