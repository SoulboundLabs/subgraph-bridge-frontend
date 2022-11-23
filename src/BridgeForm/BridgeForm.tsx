import { format_graphql } from "@badgeth/graphql-generate";
import { useSetChain } from "@web3-onboard/react";
import { ethers } from "ethers";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../Button/Button";
import CodeEditor from "../Code/CodeEditor";
import { InputGroup } from "../Form/InputGroup";
import { RadioButtons } from "../Form/RadioButtons";
import { RadioCardsIcon } from "../Form/RadioCardsIcon";
import { HrText } from "../Hr/HrText";
import { blockChainIds, blockChains } from "../lib/blockchains";
import { useSubmitSubgraphBridge } from "../lib/wallet";
import { TitleDescription } from "../Text/TitleDescription";
import {
  disputeResolutionOptions,
  minimumSlashableGRTOptions,
} from "./bridge-options";

const formatQueryToMatchGateway = (query: string) => {
  try {
    return `{"query":${format_graphql(query)},"variables":{}}`;
  } catch (e) {
    return null;
  }
};

const hexlify = (value: string) =>
  ethers.utils.hexlify(ethers.utils.toUtf8Bytes(value));

const formToTx = (form: FormValues): TxValues => {
  const { query, ...rest } = form;
  const formattedQuery = formatQueryToMatchGateway(query);
  if (!formattedQuery) {
    return null;
  }

  const hashSplitString = "hash: \\";
  const hashIndex = formattedQuery.indexOf(hashSplitString);

  const queryFirstChunk = hexlify(
    formattedQuery.slice(0, hashIndex + hashSplitString.length)
  );
  const querySecondChunk = hexlify(
    formattedQuery.slice(hashIndex + hashSplitString.length - 1)
  );

  return {
    ...rest,
    queryFirstChunk,
    querySecondChunk,
  };
};

interface FormValues {
  query: string;
  chainID: number;
  subgraphDeploymentID: string;
  disputeResolution: string;
  minimumSlashableGRT: number;
  responseDataOffset: number;
  responseDataType: string;
  disputeResolutionWindow: number;
}

type TxValues = Omit<FormValues, "query" | "chainID"> & {
  queryFirstChunk: string;
  querySecondChunk: string;
};

export const BridgeForm = () => {
  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      chainID: null,
      subgraphDeploymentID: "",
      query: `{
  exampleModels(first: 5, block: { hash: "" }) {
    id
  }
}
`,
      responseDataOffset: 0,
      responseDataType: "",
      minimumSlashableGRT: 100000,
      disputeResolutionWindow: 0,
    },
  });

  const [{ connectedChain }, setChain] = useSetChain();
  const submitSubgraphBridge = useSubmitSubgraphBridge();

  const onSubmit = (data: FormValues) => {
    const txData = formToTx(data);
    console.log("TxValues", txData);
    submitSubgraphBridge(txData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-reverse pb-10">
      <div className="mb-2.5 z-20 rounded-lg text-slate-300 text-left">
        <TitleDescription
          title="Create New Subgraph Bridge"
          description="Use the form below to define the parameters and security config for a new Subgraph Bridge."
        />

        <HrText description="Which chain on the decentralized network is the subgraph deployed to?">
          Choose Blockchain
        </HrText>

        <div className="space-y-4 pt-6">
          <RadioCardsIcon
            options={blockChains}
            value={connectedChain?.id}
            onChange={(value) => {
              setChain({ chainId: value });
            }}
          />
          {!blockChainIds.includes(connectedChain?.id) && (
            <div className="font-semibold text-white rounded-sm p-2 bg-red-900/50">
              Please connect to a supported blockchain.
            </div>
          )}
        </div>

        <HrText
          description={
            <span>
              Look underneath the "DEPLOYMENT ID" header on any subgraph listed
              on the{" "}
              <a
                href="https://thegraph.com/explorer"
                target="_blank"
                className="text-sky-300 hover:underline"
              >
                Graph Explorer
              </a>{" "}
              page.
            </span>
          }
        >
          Enter Subgraph Deployment ID
        </HrText>

        <div className="space-y-4 pt-6">
          <Controller
            control={control}
            name="subgraphDeploymentID"
            rules={{
              required: true,
            }}
            render={({ field }) => <InputGroup {...field} />}
          />
        </div>

        <HrText description="What query do you want to results on-chain?">
          Enter GraphQL Query
        </HrText>

        <div className="space-y-4 pt-6">
          <Controller
            control={control}
            name="query"
            rules={{
              required: true,
              validate: {
                containsBlockHash: (value) => {
                  return (
                    value.includes(`block: { hash: "" }`) ||
                    `Query must contain empty block hash filter: block: {hash: ""}`
                  );
                },
                isValidGraphQL: (value) =>
                  formatQueryToMatchGateway(value) !== null ||
                  "Invalid GraphQL query",
              },
            }}
            render={({ field }) => <CodeEditor {...field} />}
          />
          {errors.query?.message && (
            <div className="font-semibold text-white rounded-sm p-2 bg-red-900/50">
              {errors.query?.message}
            </div>
          )}
          {/* <div className="flex justify-end">
            <Button Icon={AlertCircle} label="Test Query" />
          </div> */}
        </div>

        <HrText description="How much crypto-economic security should a query result for this Subgraph Bridge have? Indexers are liable to lose 2.5% of their self-staked GRT for supplying invalid query results.">
          Minimum Slashable Stake
        </HrText>

        <div className="space-y-4 pt-6">
          <Controller
            control={control}
            name="minimumSlashableGRT"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <RadioButtons {...field} options={minimumSlashableGRTOptions} />
            )}
          />
        </div>

        <HrText description="Use a longer dispute window for extra security, choose a shorter dispute window for quicker finality.">
          Dispute Window
        </HrText>

        <div className="space-y-4 pt-6">
          <Controller
            control={control}
            name="disputeResolutionWindow"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <RadioButtons {...field} options={disputeResolutionOptions} />
            )}
          />
        </div>

        <div className="flex justify-end pt-6">
          <Button
            disabled={!isDirty || !isValid}
            label="Create New Subgraph Bridge"
            palette="secondary"
            size="lg"
            stretch
            type="submit"
          />
        </div>
      </div>
    </form>
  );
};
