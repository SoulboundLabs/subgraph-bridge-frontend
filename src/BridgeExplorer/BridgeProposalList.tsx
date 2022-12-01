import { Controller, useForm } from "react-hook-form";
import { RadioButtons } from "../Form/RadioButtons";
import { SubgraphBridge } from "../store/types";
import { BridgeProposal } from "./BridgeProposal";

interface Props {
  bridge: SubgraphBridge;
}

const bridgeProposals = [
  {
    id: "0x0000000000000000000000000000000000000000",
    author: "0x14d2342134asda435",
  },
  {
    id: "0x0000000000000000000000000000000000000001",
    author: "0x1adasd2314asdbp23417sd",
  },
];

const proposalOptions = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Certified",
    value: "certified",
  },
  {
    label: "Disputed",
    value: "disputed",
  },
];

export const BridgeProposalList = ({ bridge }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      proposalStatus: null,
    },
  });

  return (
    <div className="mt-4 bg-slate-900 rounded p-4">
      <Controller
        control={control}
        name="proposalStatus"
        rules={{
          required: true,
        }}
        render={({ field }) => (
          <RadioButtons {...field} options={proposalOptions} />
        )}
      />
      <div className="space-y-4 mt-4">
        {bridgeProposals.map((proposal) => (
          <BridgeProposal key={proposal.id} proposal={proposal} />
        ))}
      </div>
    </div>
  );
};
