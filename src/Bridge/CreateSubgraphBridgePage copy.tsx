import { Collapse } from "../Collapse/Collapse";
import { CreateSubgraphBridge } from "./CreateSubgraphBridge";

export const CreateSubgraphBridgePage = () => {
  return (
    <div className="container max-w-5xl mx-auto mt-6">
      <div className="flex justify-between items-start gap-16">
        <div className="w-full">
          <CreateSubgraphBridge />
        </div>
        <div className="space-y-4 flex-none">
          <Collapse
            title="What is the Subgraph Bridge designed to do?"
            children="No"
          />
          <Collapse
            title="What is the Subgraph Bridge designed to do?"
            children="No"
          />
          <Collapse
            title="What is the Subgraph Bridge designed to do?"
            children="No"
          />
          <Collapse
            title="What is the Subgraph Bridge designed to do?"
            children="No"
          />
        </div>
      </div>
    </div>
  );
};
