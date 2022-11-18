import { TitleDescription } from "../Text/TitleDescription";
import { SubgraphBridgeList } from "./SubgraphBridgeList";

export const AllBridgesPage = () => {
  return (
    <div className="container max-w-7xl mx-auto mt-6">
      <TitleDescription
        title="Explore Subgraph Bridges"
        description="View and interact with the Subgraph Bridges that have been created by The Graph community."
      />
      <div className="mt-6">
        <SubgraphBridgeList />
      </div>
    </div>
  );
};
