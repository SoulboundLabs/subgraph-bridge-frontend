import { prepareWriteContract, writeContract } from "@wagmi/core";
import React, { useEffect } from "react";
import { useProvider } from "wagmi";
import subgraphBridgeABI from "../assets/abis/subgraph-bridge-abi.json";
import { Button } from "../Button/Button";
import { HrText } from "../Hr/HrText";
import { Container } from "../Layout/Container";
import { blockChainMap, GOERLI } from "../lib/blockchains";
import { executeLatestQueryTemplate } from "../lib/query";
import { SubgraphBridge } from "../store/types";

interface Props {
  bridge: SubgraphBridge;
  handleCancel: () => void;
}

export const ResponseForm = ({ handleCancel, bridge }: Props) => {
  const [response, setResponse] = React.useState(null);
  const provider = useProvider();

  useEffect(() => {
    executeLatestQueryTemplate(
      bridge.fullQuery,
      bridge.subgraphDeploymentID
    ).then(({ data, attestationData, blockNumber, blockHash }) => {
      setResponse({
        data,
        attestationData,
        blockNumber,
        blockHash,
      });
    });
  }, [provider]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const config = await prepareWriteContract({
      address: blockChainMap[GOERLI].address,
      abi: subgraphBridgeABI as any,
      functionName: "postSubgraphResponse",
    });
    const data = await writeContract(config);
  };

  return (
    <Container>
      <form onSubmit={onSubmit} className="pb-24">
        <div className="mb-2.5 z-20 rounded-lg text-slate-300 text-left">
          <HrText description={<div>Block Number: </div>}>
            Latest Query Result
          </HrText>
          <pre>{response && JSON.stringify(response, null, 2)}</pre>
        </div>

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
