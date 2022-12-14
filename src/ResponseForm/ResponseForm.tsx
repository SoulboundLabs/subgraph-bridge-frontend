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
  const [queryResponse, setQueryResponse] = React.useState<any>(null);

  console.log("BRIDGE: ", bridge);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const txData = {
      blockNumber: queryResponse.blockNumber,
      subgraphBridgeID: bridge.subgraphBridgeId,
      response: JSON.stringify(queryResponse.data),
      attestationData: queryResponse.attestationData,
    };

    console.log(txData);

    const config = await prepareWriteContract({
      address: blockChainMap[GOERLI].address,
      abi: subgraphBridgeABI as any,
      functionName: "postSubgraphResponse",
      args: [txData.blockNumber, txData.subgraphBridgeID, txData.response, txData.attestationData],
    });
    const data = await writeContract(config);
  };

  const { subgraphDeploymentID, fullQuery } = bridge;

  console.log("queryResponse", queryResponse);
  return (
    <Container>
      <form onSubmit={onSubmit} className="pb-24">
        <BridgeQueryExecutor onSuccess={setQueryResponse} subgraphDeploymentID={subgraphDeploymentID} query={fullQuery} disabled={false} loadOnMount={true} />
        <div className="flex justify-end py-4 gap-4 absolute bottom-0 inset-x-0 px-8 border-t border-slate-500 bg-slate-900">
          <Button label="Cancel" size="lg" onClick={handleCancel} />
          <Button disabled={!queryResponse} label="Submit Response" palette="secondary" size="lg" type="submit" />
        </div>
      </form>
    </Container>
  );
};
