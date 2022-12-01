import { Container } from "../Layout/Container";
import { SubgraphBridgeList } from "./SubgraphBridgeList";

export const AllBridgesPage = () => {
  return (
    <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
      <Container>
        <h1 className="text-2xl font-bold leading-7 text-white">Episodes</h1>
      </Container>
      <div className="mt-6">
        <SubgraphBridgeList />
      </div>
    </div>
  );
};
