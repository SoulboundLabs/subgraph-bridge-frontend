import { format_graphql } from "@badgeth/graphql-generate";
import {
  getNetwork,
  prepareWriteContract,
  switchNetwork,
  writeContract,
} from "@wagmi/core";
import { BigNumber } from "ethers";
import { Controller, useForm } from "react-hook-form";
import { ArrowRight } from "tabler-icons-react";
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
import { IconList } from "../List/IconList";
import {
  minimumSlashableGRTOptions,
  proposalFreezePeriodOptions,
} from "./bridge-options";
import { BridgeQueryExecutor } from "./BridgeQueryExecutor";

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

  const hashSplitString = 'hash: \\"';
  const hashIndex = formattedQuery.indexOf(hashSplitString);
  const queryFirstChunk = hexlifyQuery(
    formattedQuery.slice(0, hashIndex + hashSplitString.length)
  );
  const queryLastChunk = hexlifyQuery(
    formattedQuery.slice(hashIndex + hashSplitString.length)
  );

  return {
    ...rest,
    proposalFreezePeriod: proposalFreezePeriod,
    minimumSlashableGRT: minimumSlashableGRT,
    subgraphDeploymentID: hexlifySubgraphDeploymentID(subgraphDeploymentID),
    queryFirstChunk,
    queryLastChunk,
  };
};

interface FormValues {
  query: string;
  chainID: number;
  subgraphDeploymentID: string;
  minimumSlashableGRT: BigNumber;
  proposalFreezePeriod: BigNumber;
  responseDataOffset: number;
  responseDataType: number;
}

type TxValues = Omit<FormValues, "query" | "chainID"> & {
  queryFirstChunk: string;
  queryLastChunk: string;
};

export const BridgeForm = ({ handleCancel }) => {
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
      subgraphDeploymentID: "",
      query: `{
  exampleEntity(id: 1, block: { hash: "" }) {
    exampleField
  }
}
`,
      responseDataOffset: 1, //@dev this should never be 0 bc that's how we see if a bridge exists or not, we should add a check for this
      responseDataType: 0,
      minimumSlashableGRT: minimumSlashableGRTOptions[0].value,
      proposalFreezePeriod: proposalFreezePeriodOptions[0].value,
    },
  });

  const { chain } = getNetwork();

  console.log(errors, isValid);

  const subgraphDeploymentID = watch("subgraphDeploymentID");

  const query = watch("query");

  const onSubmit = async (formData: FormValues) => {
    const keyword = getKeyword(formData.query);

    // send a query the subgraph to get the response data to find the offset
    const response = JSON.stringify(
      (await executeLatestQueryTemplate(query, subgraphDeploymentID)).data
    );

    formData.responseDataOffset = getResponseDataOffset(response, keyword);
    const txData = formToTx(formData);
    const config = await prepareWriteContract({
      address: blockChainMap[GOERLI].address,
      abi: subgraphBridgeABI as any,
      functionName: "createSubgraphBridge",
      args: [txData],
    });
    console.log("CONFIG: ", txData);
    const data = await writeContract(config);
    console.log(data);
  };

  function getResponseDataOffset(query: string, keyword: string) {
    return query.indexOf(keyword) + keyword.length + 2; // 2 is the amount of characters that follow the keyword
  }

  function getKeyword(query: string) {
    const regex = /(\w+)\n/gm;
    const matches = query.matchAll(regex);
    const arr = [...matches];
    if (arr.length > 1) {
      throw new Error("Query contains more than one keyword");
    } else {
      return arr[0][1];
    }
  }

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
                Define a GraphQL query template that can populate dynamic block
                hashes
                <div className="mt-2">
                  <IconList
                    Icon={ArrowRight}
                    items={[
                      <span>
                        <span className="bg-slate-100/20 p-0.5 rounded inline-block">
                          {" "}
                          {`block: { hash: "" }`}{" "}
                        </span>{" "}
                        must be included in the query
                      </span>,
                      "No other variables allowed",
                      "Query must return only a single value",
                    ]}
                  />
                </div>
              </div>
            }
          >
            Enter GraphQL Query Template
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

            <BridgeQueryExecutor
              disabled={!isValid}
              subgraphDeploymentID={subgraphDeploymentID}
              query={query}
              onSuccess={() => console.log("success!")}
            />
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
