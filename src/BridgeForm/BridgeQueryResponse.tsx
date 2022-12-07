import { classNames } from "../lib/utils";
import { FancyNumber } from "../Tag/FancyNumber";

export const BridgeQueryResponse = ({ response, blockNumber, blockHash }) => {
  return (
    <pre
      className={classNames(
        response.errors ? `bg-red-500/20` : `bg-green-500/20`,
        `rounded text-white p-4 overflow-scroll relative`
      )}
    >
      {JSON.stringify(response, null, 2)}
      <div className="absolute bottom-1 right-1">
        <FancyNumber>
          Block {blockNumber} &middot; Hash {blockHash}
        </FancyNumber>
      </div>
    </pre>
  );
};
