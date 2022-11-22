import { format_graphql } from "@badgeth/graphql-generate";
import { useConnectWallet } from "@web3-onboard/react";
import { ethers } from "ethers";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import { Button } from "../Button/Button";
import CodeEditor from "../Code/CodeEditor";
import { InputGroup } from "../Form/InputGroup";
import { RadioButtons } from "../Form/RadioButtons";
import { RadioCardsIcon } from "../Form/RadioCardsIcon";
import { HrText } from "../Hr/HrText";
import { blockChains } from "../lib/blockchains";
import { TitleDescription } from "../Text/TitleDescription";
import {
  disputeResolutionOptions,
  minimumSlashableGRTOptions,
} from "./bridge-options";

const formatQueryToMatchGateway = (query: string) => {
  try {
    console.log("validating query", query);
    return `{"query":${format_graphql(query)},"variables":{}}`;
  } catch (e) {
    console.log("error validating query", e);
    return null;
  }
};

const goerliAddress = "0xebD596E84E8fcc8040e42D233eb2B39257302EEe";
let subgraphBridgeContract, provider;

export const CreateSubgraphBridge = ({ form }) => {
  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = form;

  const [{ wallet }] = useConnectWallet();

  const onSubmit = (data) => {
    console.log("~~~~");
    console.log(formatQueryToMatchGateway("banana"));
    console.log({
      ...data,
      gatewayQuery: formatQueryToMatchGateway(data.query),
    });
  };

  useEffect(() => {
    if (!wallet?.provider) {
      provider = null;
    } else {
      provider = new ethers.providers.Web3Provider(wallet.provider, "any");

      // subgraphBridgeContract = new ethers.Contract(
      //   "0xb8c12850827ded46b9ded8c1b6373da0c4d60370",
      //   subgraphBridgeContract,
      //   provider.getUncheckedSigner()
      // );
    }
  }, [wallet]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-reverse">
      <div className="mb-2.5 z-20 rounded-lg text-slate-300 text-left">
        <TitleDescription
          title="Create New Subgraph Bridge"
          description="Use the form below to define the parameters and security config for a new Subgraph Bridge."
        />

        <HrText description="Which chain on the decentralized network is the subgraph deployed to?">
          Choose Blockchain
        </HrText>

        <div className="space-y-4 pt-6">
          <Controller
            control={control}
            name="chainID"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <RadioCardsIcon options={blockChains} {...field} />
            )}
          />
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
                    value.includes(`block: { hash: "" }`) || (
                      <span>
                        Query must contain empty block hash where filter:{" "}
                        <code className="bg-rose-900 text-white px-1">{`block: {hash: ""}`}</code>
                      </span>
                    )
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
            <div className="font-semibold text-rose-800 rounded-sm p-2 bg-rose-300">
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
