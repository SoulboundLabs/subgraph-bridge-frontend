import { BridgeForm } from "./BridgeForm";

export const BridgeFormPage = () => {
  return (
    <div className="container max-w-7xl mx-auto mt-6">
      <div className="flex gap-8">
        <BridgeForm />
        <div className="w-1/2 flex-none"></div>
      </div>
    </div>
  );
};
