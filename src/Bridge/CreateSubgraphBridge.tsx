import { format_graphql } from "@badgeth/graphql-generate";
import { Controller } from "react-hook-form";
import { AlertCircle } from "tabler-icons-react";
import { Button } from "../Button/Button";
import CodeEditor from "../Code/CodeEditor";
import { InputGroup } from "../Form/InputGroup";
import { RadioButtons } from "../Form/RadioButtons";
import { RadioCardsIcon } from "../Form/RadioCardsIcon";
import { HrText } from "../Hr/HrText";
import { blockChains } from "../lib/blockchains";
import { TitleDescription } from "../Text/TitleDescription";

const minimumSlashableGRTOptions = [
  {
    label: (
      <div>
        <div>Low Security</div>
        <div className="text-xs">100k Self-Staked GRT</div>
      </div>
    ),
    value: 100000,
  },
  {
    label: (
      <div>
        <div>Basic Security</div>
        <div className="text-xs">300k Self-Staked GRT</div>
      </div>
    ),
    value: 300000,
  },
  {
    label: (
      <div>
        <div>Medium Security</div>
        <div className="text-xs">750k Self-Staked GRT</div>
      </div>
    ),
    value: 750000,
  },
  {
    label: (
      <div>
        <div>Strong Security</div>
        <div className="text-xs">2M Self-Staked GRT</div>
      </div>
    ),
    value: 2000000,
  },
  {
    label: (
      <div>
        <div>Max Security</div>
        <div className="text-xs">5M Self-Staked GRT</div>
      </div>
    ),
    value: 5000000,
  },
];

const disputeResolutionOptions = [
  {
    label: (
      <div>
        <div>Immediate Finality</div>
        <div className="text-xs">0 Blocks</div>
      </div>
    ),
    value: 0,
  },
  {
    label: (
      <div>
        <div>Quick Finality</div>
        <div className="text-xs">100 Blocks</div>
      </div>
    ),
    value: 100,
  },
  {
    label: (
      <div>
        <div>Medium Finality</div>
        <div className="text-xs">1,000 Blocks</div>
      </div>
    ),
    value: 1000,
  },
  {
    label: (
      <div>
        <div>Long Finality</div>
        <div className="text-xs">5,000 Blocks</div>
      </div>
    ),
    value: 5000,
  },
  {
    label: (
      <div>
        <div>Extended Finality</div>
        <div className="text-xs">25,000 Blocks</div>
      </div>
    ),
    value: 25000,
  },
];

export const CreateSubgraphBridge = ({ form }) => {
  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data) => {
    console.log({ ...data, query: format_graphql(data.query) });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-reverse">
      <div className="mb-2.5 z-20 rounded-lg text-slate-300 text-left">
        <TitleDescription
          title="Create New Subgraph Bridge"
          description="Use the form below to define the parameters and security config for a new Subgraph Bridge."
        />

        {/* <BannerCreateSubgraphBridge /> */}

        <HrText description="Which chain on the decentralized network is the subgraph deployed to?">
          Choose Blockchain
        </HrText>

        <div className="space-y-4 pt-6">
          <Controller
            control={control}
            name="chainID"
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
            render={({ field }) => <InputGroup {...field} />}
          />
        </div>

        <HrText description="What query results do you want to bridge on-chain?">
          Enter GraphQL Query
        </HrText>

        <div className="space-y-4 pt-6">
          <Controller
            control={control}
            name="query"
            render={({ field }) => <CodeEditor {...field} />}
          />
          <div className="flex justify-end">
            <Button Icon={AlertCircle} label="Test Query" />
          </div>
        </div>

        <HrText description="How much crypto-economic security should a query result for this Subgraph Bridge have? Indexers are liable to lose 2.5% of their self-staked GRT for supplying invalid query results.">
          Minimum Slashable Stake
        </HrText>

        <div className="space-y-4 pt-6">
          <Controller
            control={control}
            name="minimumSlashableGRT"
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
            render={({ field }) => (
              <RadioButtons {...field} options={disputeResolutionOptions} />
            )}
          />
        </div>

        <div className="flex justify-end pt-6">
          <Button
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
