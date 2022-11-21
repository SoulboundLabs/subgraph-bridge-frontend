import { Controller } from "react-hook-form";
import { Button } from "../Button/Button";
import CodeEditor from "../Code/CodeEditor";
import { InputGroup } from "../Form/InputGroup";
import { RadioCardsIcon } from "../Form/RadioCardsIcon";
import { Slider } from "../Form/Slider";
import { HrText } from "../Hr/HrText";
import { blockChains } from "../lib/blockchains";
import { TitleDescription } from "../Text/TitleDescription";

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
              Find the Subgraph Deployment ID using the{" "}
              <a href="https://thegraph.com/explorer" target="_blank">
                Graph Explorer
              </a>
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

        <HrText description="What query do you want to ">Enter Query</HrText>

        <div className="space-y-4 pt-6">
          <Controller
            control={control}
            name="query"
            render={({ field }) => <CodeEditor {...field} />}
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
              <Slider
                label="GRT"
                {...field}
                min={100}
                max={1000}
                format={(val) => val + "k"}
              />
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
              <Slider label="Blocks" max={100000} {...field} />
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
