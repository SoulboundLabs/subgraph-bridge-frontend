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
import { Container } from "../Layout/Container";
import {
  blockChainIds,
  blockChainMap,
  blockChains,
  GOERLI,
} from "../lib/blockchains";
import { hexlifyQuery, hexlifySubgraphDeploymentID } from "../lib/hex";
import { executeLatestQueryTemplate } from "../lib/query";
import {
  minimumSlashableGRTOptions,
  proposalFreezePeriodOptions,
} from "./bridge-options";

const formatQueryToMatchGateway = (query: string) => {
  try {
    return `{"query":${format_graphql(query)},"variables":{}}`;
  } catch (e) {
    return null;
  }
};

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

  debugger;

  //QmPaqnpyZFPLTygQAZXBCA5Ytx6MMhLEXS2ya4QESPTQqs
  //0x127e5918d1118aea32ff1482a3c6c1bc0ab61763c14bd54d59d6a9b4ff05b51e
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

export const BridgeForm = ({ handleCancel }) => {
  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: {
      chainID: 5,
      subgraphDeploymentID: "",
      query: `{
  eligibleAirdropMerkleRoot(id: 1, block: { hash: "" }) {
    merkleRoot
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
    const config = await prepareWriteContract({
      address: blockChainMap[GOERLI].address,
      abi: subgraphBridgeABI as any,
      functionName: "createSubgraphBridge",
      args: [txData],
    });
    const data = await writeContract(config);
    console.log(data);
  };

  const subgraphDeploymentID = watch("subgraphDeploymentID");

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)} className="pb-24">
        <div className="mb-2.5 z-20 rounded-lg text-slate-300 text-left">
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
                Look underneath the "DEPLOYMENT ID" header on any subgraph
                listed on the{" "}
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
                minLength: {
                  value: 46,
                  message: "Subgraph Deployment ID must be 46 characters",
                },
                maxLength: 46,
              }}
              render={({ field }) => <InputGroup {...field} />}
            />
            {errors.subgraphDeploymentID?.message && (
              <div className="font-semibold text-white rounded-sm p-2 bg-red-900/50">
                {errors.subgraphDeploymentID?.message}
              </div>
            )}
          </div>

          <HrText
            description={
              <div>
                What query do you want to results on-chain?
                <ul className="list-disc">
                  <li>Must be a query without any variables</li>
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
                  returnsResult: async (value) => {
                    const errMsg =
                      "Query must return a result for supplied subgraph deployment ID";
                    try {
                      const data = await executeLatestQueryTemplate(
                        value,
                        subgraphDeploymentID
                      );
                      return data;
                    } catch (e) {
                      return errMsg;
                    }
                  },
                },
              }}
              render={({ field }) => <CodeEditor {...field} />}
            />
            {errors.query?.message && (
              <div className="font-semibold text-white rounded-sm p-2 bg-red-900/50">
                {errors.query?.message}
              </div>
            )}
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
                <RadioButtons
                  size="xl"
                  {...field}
                  options={minimumSlashableGRTOptions}
                />
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
                <RadioButtons
                  {...field}
                  size="xl"
                  options={proposalFreezePeriodOptions}
                />
              )}
            />
          </div>

          <div className="flex justify-end py-4 gap-4 absolute bottom-0 inset-x-0 px-8 border-t border-slate-500 bg-slate-900">
            <Button label="Cancel" size="lg" onClick={handleCancel} />
            <Button
              disabled={!isValid}
              label="Create Bridge"
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
