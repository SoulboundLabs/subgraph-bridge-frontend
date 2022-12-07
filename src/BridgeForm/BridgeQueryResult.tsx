import { FancyNumber } from "../Tag/FancyNumber";

export const BridgeQueryResult = ({ result, blockNumber, blockHash }) => {
  return (
    <pre className="bg-slate-300/10 rounded p-4 overflow-scroll relative">
      {JSON.stringify(result, null, 2)}
      <div className="absolute bottom-1 right-1">
        <FancyNumber>
          Block {blockNumber} &middot; Hash {blockHash}
        </FancyNumber>
      </div>
    </pre>
  );
};
