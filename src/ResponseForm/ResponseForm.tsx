import { prepareWriteContract, writeContract } from "@wagmi/core";
import React from "react";
import subgraphBridgeABI from "../assets/abis/subgraph-bridge-abi.json";
import { BridgeQueryExecutor } from "../BridgeForm/BridgeQueryExecutor";
import { Button } from "../Button/Button";
import { Container } from "../Layout/Container";
import { blockChainMap, GOERLI } from "../lib/blockchains";
import { SubgraphBridge } from "../store/types";

interface Props {
  bridge: SubgraphBridge;
  handleCancel: () => void;
}

export const ResponseForm = ({ handleCancel, bridge }: Props) => {
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const config = await prepareWriteContract({
      address: blockChainMap[GOERLI].address,
      abi: subgraphBridgeABI as any,
      functionName: "postSubgraphResponse",
    });
    const data = await writeContract(config);
  };

  const { subgraphDeploymentID, fullQuery } = bridge;

  return (
    <Container>
      <form onSubmit={onSubmit} className="pb-24">
        <BridgeQueryExecutor
          subgraphDeploymentID={subgraphDeploymentID}
          query={fullQuery}
          disabled={false}
          loadOnMount={true}
        />
        <div className="flex justify-end py-4 gap-4 absolute bottom-0 inset-x-0 px-8 border-t border-slate-500 bg-slate-900">
          <Button label="Cancel" size="lg" onClick={handleCancel} />
          <Button
            label="Submit Response"
            palette="secondary"
            size="lg"
            type="submit"
          />
        </div>
      </form>
    </Container>
  );
};
