import { Button } from "../Button/Button";
import { Container } from "../Layout/Container";
import { ConnectWallet } from "../Wallet/ConnectWallet";
import { SubgraphBridgeList } from "./SubgraphBridgeList";

export const AllBridgesPage = () => {
  return (
    <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
      <div className="flex w-full pr-12">
        <Container className="w-full">
          <div className="flex gap-2 items-center text-white">
            <span className="text-2xl font-bold leading-7">
              Deployed Bridges
            </span>{" "}
            <Button size="sm" label={7} />
          </div>
        </Container>
        <ConnectWallet />
      </div>

      <div className="mt-6">
        <SubgraphBridgeList />
      </div>
    </div>
  );
};
