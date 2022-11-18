import { Link } from "react-router-dom";
import { chainIdToIcon, chainIdToLabel } from "../lib/chain-ids";
import { urlBridgeItem } from "../lib/url";
import { SubgraphBridge } from "../store/types";

interface Props {
  bridge: SubgraphBridge;
}

const chainId = 5; // TODO: get from subgraph
const height = 300;

export const SubgraphBridgeItem = ({ bridge }: Props) => {
  const { id, config } = bridge;

  const {
    queryFirstChunk,
    querySecondChunk,
    responseDataOffset,
    responseDataType,
    subgraphDeploymentID,
    proposalFreezePeriod,
    minimumSlashableGRT,
    disputeResolutionWindow,
  } = config;

  return (
    <Link
      to={urlBridgeItem(id)}
      style={{ height }}
      className="font-semibold p-4 flex-col bg-slate-300/10 hover:bg-slate-300/20 text-white mb-4 transition-colors relative group rounded-md"
    >
      <div className="pb-3 flex items-center w-full justify-between">
        {/* <SubgraphThumbnail
          deployed={!!subgraph.deploymentUrl}
          thumbnail={subgraph.thumbnail}
          width={12}
        />
        <img
          src={chainIdtoIcon(chainId)}
          className="w-12 h-12 -mr-1 filter invert opacity-50 group-hover:opacity-100 transition"
        /> */}
      </div>
      <div className="text-center sm:mt-0  sm:text-left flex gap-2 items-center">
        <div className="text-xl font-semibold text-white">
          {subgraphDeploymentID}
        </div>
      </div>
      <div className="text-base mt-1 flex gap-1.5 h-5 items-center ">
        <p className="mt-1 text-center text group-hover:text-white transition text-slate-300">
          <span className="gap-1.5 flex ">
            <>
              <span className="flex gap-1 items-center">
                <img
                  src={chainIdToIcon(chainId)}
                  className="w-5 h-5 filter invert"
                />
                {chainIdToLabel(chainId)}
              </span>
              &middot;
            </>
            <>
              <span className="capitalize">Subgraph Bridge</span>
              &middot;
            </>
            <span className="">
              {/* {contracts.length}{" "}
              {pluralize({
                singular: "Contract",
                count: contracts.length,
              })} */}
            </span>
          </span>
        </p>
      </div>
      <div className="mt-6 text-gray-300 text-sm line-clamp-3">
        {/* {description} */}
      </div>
      <p className="absolute bottom-4 flex inset-x-4 gap-2">
        {/* {tags.length > 0 ? (
          tagList
        ) : (
          <FancyNumber>
            <span className="">
              Edited <FromNow timestamp={updatedAt} />
            </span>
          </FancyNumber>
        )} */}
      </p>
    </Link>
  );
};
