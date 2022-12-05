import { prepareWriteContract, writeContract } from "@wagmi/core";
import axios from "axios";
import { ethers } from "ethers";
import React, { useEffect } from "react";
import { useBlockNumber, useProvider } from "wagmi";
import subgraphBridgeABI from "../assets/abis/subgraph-bridge-abi.json";
import { Button } from "../Button/Button";
import { HrText } from "../Hr/HrText";
import { Container } from "../Layout/Container";
import { blockChainMap, GOERLI } from "../lib/blockchains";
import { SubgraphBridge } from "../store/types";

interface FormValues {
  blockNumber: number;
  subgraphBridgeID: string;
  response: string;
  attestationData: string;
}

export const querySubgraph = async (
  provider: ethers.providers.Provider,
  bridge: SubgraphBridge
) => {
  const { fullQuery } = bridge;

  const blockNumber = await provider.getBlockNumber();
  const { hash } = await provider.getBlock(blockNumber);

  const queryWithHash = bridge.fullQuery.replace('hash: ""', `hash: "${hash}"`);

  console.log(queryWithHash);

  const apiKey = "6c768ea8853128ba36dc7c405c20b37d";
  const url = `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/Cjv3tykF4wnd6m9TRmQV7weiLjizDnhyt6x2tTJB42Cy`;

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");

  const response = await axios({
    url,
    method: "post",
    data: {
      query: queryWithHash,
    },
  });

  const graphAttestation = response.headers["graph-attestation"];
  console.log(graphAttestation);

  const attestationBytes = ethers.utils.hexlify(
    ethers.utils.toUtf8Bytes(graphAttestation)
  );
  console.log(attestationBytes);

  const data = response.data;
  console.log(data);

  return { data, attestationBytes, blockNumber, hash };
};

interface Props {
  bridge: SubgraphBridge;
  handleCancel: () => void;
}

export const ResponseForm = ({ handleCancel, bridge }: Props) => {
  const { queryFirstChunk, queryLastChunk, subgraphDeploymentID, id } = bridge;
  const [response, setResponse] = React.useState(null);

  const { data: blockNumber, isError, isLoading } = useBlockNumber();
  const provider = useProvider();

  useEffect(() => {
    querySubgraph(provider, bridge).then(
      ({ data, attestationBytes, blockNumber, hash }) =>
        setResponse({
          blockNumber,
          data,
          attestationBytes,
          hash,
        })
    );
  }, [provider]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const config = await prepareWriteContract({
      address: blockChainMap[GOERLI].address,
      abi: subgraphBridgeABI as any,
      functionName: "postSubgraphResponse",
      args: [formData],
    });
    const data = await writeContract(config);
  };

  return (
    <Container>
      <form onSubmit={onSubmit} className="pb-24">
        <div className="mb-2.5 z-20 rounded-lg text-slate-300 text-left">
          <HrText>Latest Query Result</HrText>
        </div>

        <div className="mb-2.5 z-20 rounded-lg text-slate-300 text-left">
          <HrText>Response</HrText>
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
