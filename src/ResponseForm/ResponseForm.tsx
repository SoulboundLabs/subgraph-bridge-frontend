import { prepareWriteContract, writeContract } from "@wagmi/core";
import { ethers } from "ethers";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import subgraphBridgeABI from "../assets/abis/subgraph-bridge-abi.json";
import { Button } from "../Button/Button";
import { InputGroup } from "../Form/InputGroup";
import { TextareaGroup } from "../Form/TextareaGroup";
import { HrText } from "../Hr/HrText";
import { Container } from "../Layout/Container";
import { blockChainMap, GOERLI } from "../lib/blockchains";

interface FormValues {
  blockHash: string;
  subgraphBridgeID: string;
  response: string;
  attestationData: string;
}

export const querySubgraph = async (
  subgraphDeploymentID: string,
  query: string
) => {
  const apiKey = "6c768ea8853128ba36dc7c405c20b37d";
  const url = `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/Cjv3tykF4wnd6m9TRmQV7weiLjizDnhyt6x2tTJB42Cy`;

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");

  const response = await fetch({
    url,
    method: "post",
    headers: requestHeaders,
    body: JSON.stringify({
      query: `
        {
            bonderAddeds(first: 1){
              id
            }
        }
        `,
    }),
  });

  const graphAttestation = response.headers["graph-attestation"];
  console.log(graphAttestation);

  const attestationBytes = ethers.utils.hexlify(
    ethers.utils.toUtf8Bytes(graphAttestation)
  );
  console.log(attestationBytes);

  const data = response.data;
  console.log(data);
};

export const ResponseForm = ({ handleCancel, subgraphBridgeID }) => {
  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      subgraphBridgeID,
      blockHash: "",
      response: "",
      attestationData: "",
    },
  });

  const onSubmit = async (formData: FormValues, e: React.FormEvent) => {
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
      <form onSubmit={handleSubmit(onSubmit)} className="pb-24">
        <div className="mb-2.5 z-20 rounded-lg text-slate-300 text-left">
          <HrText>Enter Subgraph Deployment ID</HrText>

          <div className="space-y-4 pt-6">
            <Controller
              control={control}
              name="subgraphBridgeID"
              rules={{
                required: true,
              }}
              render={({ field }) => <InputGroup {...field} />}
            />
          </div>

          <HrText>Enter Block Hash</HrText>

          <div className="space-y-4 pt-6">
            <Controller
              control={control}
              name="blockHash"
              rules={{
                required: true,
              }}
              render={({ field }) => <InputGroup {...field} />}
            />
          </div>

          <HrText>Enter Response</HrText>

          <div className="space-y-4 pt-6">
            <Controller
              control={control}
              name="response"
              rules={{
                required: true,
              }}
              render={({ field }) => <TextareaGroup {...field} />}
            />
          </div>

          <HrText>Enter Attestation Data</HrText>

          <div className="space-y-4 pt-6">
            <Controller
              control={control}
              name="attestationData"
              rules={{
                required: true,
              }}
              render={({ field }) => <TextareaGroup {...field} />}
            />
          </div>

          <div className="flex justify-end py-4 gap-4 absolute bottom-0 inset-x-0 px-8 border-t border-slate-500 bg-slate-900">
            <Button label="Cancel" size="lg" onClick={handleCancel} />
            <Button
              disabled={!isValid}
              label="Submit Response"
              palette="secondary"
              size="lg"
              type="submit"
            />
          </div>
        </div>
      </form>
    </Container>
  );
};
