import { useForm } from "react-hook-form";
import { CreateSubgraphBridge } from "./CreateSubgraphBridge";

export const CreateSubgraphBridgePage = () => {
  const form = useForm({
    defaultValues: {
      chainID: 5,
      subgraphDeploymentID: "",
      query: `{
  exampleModels(first: 5) {
    id
  }
}
`,
      queryFirstChunk: "",
      querySecondChunk: "",
      responseDataOffset: "",
      responseDataType: "",
      proposalFreezePeriod: "",
      minimumSlashableGRT: 0,
      disputeResolutionWindow: 0,
    },
  });

  const formValues = form.watch();

  return (
    <div className="container max-w-7xl mx-auto mt-6">
      <div className="flex gap-8">
        <CreateSubgraphBridge form={form} />
        <div className="w-1/2 flex-none">
          <pre className="space-y-4 truncate text-white  font-semibold bg-slate-400/10 rounded-lg p-6">
            <code className="whitespace-pre-line">
              {JSON.stringify(formValues, null, 2)}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};
