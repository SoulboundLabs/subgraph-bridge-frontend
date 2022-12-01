import { format_graphql } from "@badgeth/graphql-generate";
import {
  getNetwork,
  prepareWriteContract,
  switchNetwork,
  writeContract,
} from "@wagmi/core";
import { BigNumber, ethers } from "ethers";
import { Controller, useForm } from "react-hook-form";
import subgraphBridgeABI from "../assets/abis/subgraph-bridge-abi.json";
import { Button } from "../Button/Button";
import CodeEditor from "../Code/CodeEditor";
import { InputGroup } from "../Form/InputGroup";
import { RadioButtons } from "../Form/RadioButtons";
import { RadioCardsIcon } from "../Form/RadioCardsIcon";
import { HrText } from "../Hr/HrText";
import { blockChainIds, blockChains } from "../lib/blockchains";
import { TitleDescription } from "../Text/TitleDescription";
import {
  minimumSlashableGRTOptions,
  proposalFreezePeriodOptions,
} from "./bridge-options";

const goerliAddress = "0x3400c53765e027fadd938276d4e3f024abe6e689";

const formatQueryToMatchGateway = (query: string) => {
  try {
    return `{"query":${format_graphql(query)},"variables":{}}`;
  } catch (e) {
    return null;
  }
};

const hexlifyQuery = (value: string) =>
  ethers.utils.hexlify(ethers.utils.toUtf8Bytes(value));

const hexlifySubgraphDeploymentID = (value: string) =>
  ethers.utils.hexlify(ethers.utils.base58.decode(value).slice(2));

const formToTx = (form: FormValues): TxValues => {
  const {
    query,
    chainID,
    subgraphDeploymentID,
    proposalFreezePeriod,
    minimumSlashableGRT,
    ...rest
  } = form;
  const formattedQuery = formatQueryToMatchGateway(query);
  if (!formattedQuery) {
    return null;
  }

  const hashSplitString = "hash: \\";
  const hashIndex = formattedQuery.indexOf(hashSplitString);

  const queryFirstChunk = hexlifyQuery(
    formattedQuery.slice(0, hashIndex + hashSplitString.length)
  );
  const queryLastChunk = hexlifyQuery(
    formattedQuery.slice(hashIndex + hashSplitString.length - 1)
  );

  return {
    ...rest,
    proposalFreezePeriod: ethers.utils.parseEther(
      proposalFreezePeriod.toString()
    ),
    minimumSlashableGRT: ethers.utils.parseEther(
      minimumSlashableGRT.toString()
    ),
    subgraphDeploymentID: hexlifySubgraphDeploymentID(subgraphDeploymentID),
    queryFirstChunk,
    queryLastChunk,
  };
};

interface FormValues {
  query: string;
  chainID: number;
  subgraphDeploymentID: string;
  minimumSlashableGRT: number;
  responseDataOffset: number;
  responseDataType: number;
  proposalFreezePeriod: number;
}

type TxValues = Omit<
  FormValues,
  "query" | "chainID" | "proposalFreezePeriod" | "minimumSlashableGRT"
> & {
  queryFirstChunk: string;
  queryLastChunk: string;
  minimumSlashableGRT: BigNumber;
  proposalFreezePeriod: BigNumber;
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
      chainID: 5,
      subgraphDeploymentID: "QmYDgkkfE3d9y1C5RPmVLmoxayWpFZDuiAiQYqUpFnHFiE",
      query: `{
  exampleModels(first: 5, block: { hash: "" }) {
    id
  }
}
`,
      responseDataOffset: 0,
      responseDataType: 0,
      minimumSlashableGRT: 0,
      proposalFreezePeriod: 0,
    },
  });

  const { chain } = getNetwork();

  const onSubmit = async (formData: FormValues) => {
    const txData = formToTx(formData);
    debugger;
    const config = await prepareWriteContract({
      address: goerliAddress,
      abi: subgraphBridgeABI as any,
      functionName: "createSubgraphBridge",
      args: [txData],
    });
    const data = await writeContract(config);
    console.log(data);
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
            value={chain?.id}
            onChange={(value) => {
              switchNetwork({ chainId: value });
            }}
          />
          {!blockChainIds.includes(chain?.id) && (
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

        <HrText
          description={
            <div>
              What query do you want to results on-chain?
              <ul className="list-disc">
                <li>Must be a valid GraphQL query</li>
                <li>Must be a single query</li>
                <li>Must be a query that returns a single value</li>
              </ul>
            </div>
          }
        >
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
            name="proposalFreezePeriod"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <RadioButtons {...field} options={proposalFreezePeriodOptions} />
            )}
          />
        </div>

        <div className="flex justify-end pt-6">
          <Button
            disabled={!isValid}
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