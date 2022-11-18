import { Controller } from "react-hook-form";
import { Button } from "../Button/Button";
import { InputGroup } from "../Form/InputGroup";
import { RadioButtons } from "../Form/RadioButtons";
import { RadioCardsIcon } from "../Form/RadioCardsIcon";
import { TextareaGroup } from "../Form/TextareaGroup";
import { HrText } from "../Hr/HrText";
import { blockChains } from "../lib/blockchains";

const slashableStake = [
  {
    value: 100000,
    label: "100,000 GRT",
  },
  {
    value: 200000,
    label: "200,000 GRT",
  },
  {
    value: 500000,
    label: "500,000 GRT",
  },
  {
    value: 1000000,
    label: "1,000,000 GRT",
  },
  {
    value: 2000000,
    label: "2,000,000 GRT",
  },
  {
    value: 5000000,
    label: "5,000,000 GRT",
  },
  {
    value: 10000000,
    label: "10,000,000 GRT",
  },
];

const disputeWindows = [
  {
    value: 0,
    label: "0 Minutes",
  },
  {
    value: 30,
    label: "5 Minutes",
  },
  {
    value: 30,
    label: "15 Minutes",
  },
  {
    value: 30,
    label: "30 Minutes",
  },
  {
    value: 30,
    label: "1 Hour",
  },
  {
    value: 30,
    label: "2 Hours",
  },
  {
    value: 30,
    label: "3 Hours",
  },
  {
    value: 30,
    label: "6 Hours",
  },
  {
    value: 60,
    label: "12 Hours",
  },
  {
    value: 60,
    label: "1 Day",
  },
  {
    value: 400,
    label: "2 Days",
  },
  {
    value: 1200,
    label: "5 Days",
  },
  {
    value: 1200,
    label: "7 Days",
  },
  {
    value: 1200,
    label: "10 Days",
  },
  {
    value: 1200,
    label: "14 Days",
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
  return (
    <div className="flex flex-reverse">
      <div className="mb-2.5 z-20 rounded-lg text-slate-300 text-left">
        <h1 className="text-3xl font-semibold text-white rounded mb-3">
          Create New Subgraph Bridge
        </h1>
        <p className="font-semibold">
          Use the form below to define the parameters of your new subgraph
          bridge. Subgraph bridges are created on a per-query/per-subgraph
          basis. Subgraphs must be deployed to The Graph's decentralized
          network.
        </p>

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

        <HrText description="Which blockchain do you want your subgraph to index?">
          Enter Subgraph Deployment ID
        </HrText>

        <div className="space-y-4 pt-6">
          <Controller
            control={control}
            name="subgraphDeploymentID"
            render={({ field }) => <InputGroup {...field} />}
          />
        </div>

        <HrText description="Which blockchain do you want your subgraph to index?">
          Enter Query
        </HrText>

        <div className="space-y-4 pt-6">
          <Controller
            control={control}
            name="query"
            render={({ field }) => <TextareaGroup {...field} />}
          />
        </div>

        <HrText description="How much self-staked GRT should an Indexer supplying attestations have?">
          Minimum Slashable Stake
        </HrText>

        <div className="space-y-4 pt-6">
          <Controller
            control={control}
            name="minimumSlashableGRT"
            render={({ field }) => (
              <RadioButtons options={slashableStake} {...field} />
            )}
          />
        </div>

        <HrText description="How long should Indexers wait to see their results?">
          Dispute Window
        </HrText>

        <div className="space-y-4 pt-6">
          <Controller
            control={control}
            name="disputeResolutionWindow"
            render={({ field }) => (
              <RadioButtons options={disputeWindows} {...field} />
            )}
          />
        </div>

        <div className="flex justify-end pt-6">
          <Button
            label="Create New Subgraph Bridge"
            palette="secondary"
            size="lg"
            stretch
          />
        </div>
      </div>
    </div>
  );
};
