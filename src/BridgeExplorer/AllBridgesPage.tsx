import { Container } from "../Layout/Container";
import { ConnectWallet } from "../Wallet/ConnectWallet";
import { SubgraphBridgeList } from "./SubgraphBridgeList";

export const AllBridgesPage = () => {
  return (
    <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
      <div className="flex w-full pr-12">
        <Container className="w-full">
          <h1 className="text-2xl font-bold leading-7 text-white">Bridges</h1>
        </Container>
        <ConnectWallet />
      </div>

      <div className="mt-6">
        <SubgraphBridgeList />
      </div>
    </div>
  );
};
