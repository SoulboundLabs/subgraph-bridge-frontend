import { useEffect } from "react";
import { Refresh } from "tabler-icons-react";
import { useMutation } from "wagmi";
import { Button } from "../Button/Button";
import { executeLatestQueryTemplate } from "../lib/query";
import { BridgeQueryResponse } from "./BridgeQueryResponse";

export const BridgeQueryExecutor = ({
  subgraphDeploymentID,
  query,
  disabled,
  loadOnMount = false,
}) => {
  const { data, mutate, isLoading } = useMutation(
    [{ subgraphDeploymentID, query }],
    () => executeLatestQueryTemplate(query, subgraphDeploymentID)
  );

  useEffect(() => {
    if (!disabled && loadOnMount) {
      mutate();
    }
  }, [disabled, mutate, loadOnMount]);

  return (
    <div>
      <div className="my-4">
        {data?.data && (
          <BridgeQueryResponse
            response={data.data}
            blockHash={data.blockHash}
            blockNumber={data.blockNumber}
          />
        )}
      </div>
      <Button
        disabled={disabled || isLoading}
        size="xs"
        palette="secondary"
        Icon={Refresh}
        reverse
        onClick={mutate}
        label={
          isLoading
            ? "Loading Data..."
            : data
            ? "Re-Execute Query"
            : "Execute Query"
        }
      />
    </div>
  );
};
