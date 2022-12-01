import { prepareWriteContract, writeContract } from "@wagmi/core";
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

  const onSubmit = async (formData: FormValues) => {
    const config = await prepareWriteContract({
      address: blockChainMap[GOERLI].address,
      abi: subgraphBridgeABI as any,
      functionName: "postSubgraphResponse",
      args: [formData],
    });
    const data = await writeContract(config);
    console.log(data);
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
              name="subgraphBridgeID"
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
              name="subgraphBridgeID"
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
              name="subgraphBridgeID"
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
