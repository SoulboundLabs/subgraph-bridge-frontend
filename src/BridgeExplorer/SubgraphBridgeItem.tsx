import { Link } from "react-router-dom";
import { Container } from "../Layout/Container";
import { urlBridgeItem } from "../lib/url";
import { SubgraphBridge } from "../store/types";

interface Props {
  bridge: SubgraphBridge;
}

const chainId = 5; // TODO: get from subgraph
const height = 300;

// export const SubgraphBridgeItem = ({ bridge }: Props) => {
//   const { id, config } = bridge;

//   const {
//     queryFirstChunk,
//     queryLastChunk,
//     responseDataOffset,
//     responseDataType,
//     subgraphDeploymentID,
//     minimumSlashableGRT,
//     proposalFreezePeriod,
//   } = config;

//   return (
//     <Link
//       to={urlBridgeItem(id)}
//       style={{ height }}
//       className="font-semibold p-4 flex-col bg-slate-300/10 hover:bg-slate-300/20 text-white mb-4 transition-colors relative group rounded-md"
//     >
//       <div className="pb-3 flex items-center w-full justify-between">
//         {/* <SubgraphThumbnail
//           deployed={!!subgraph.deploymentUrl}
//           thumbnail={subgraph.thumbnail}
//           width={12}
//         />
//         <img
//           src={chainIdtoIcon(chainId)}
//           className="w-12 h-12 -mr-1 filter invert opacity-50 group-hover:opacity-100 transition"
//         /> */}
//       </div>
//       <div className="text-center sm:mt-0  sm:text-left flex gap-2 items-center">
//         <div className="text-xl font-semibold text-white">
//           {subgraphDeploymentID}
//         </div>
//       </div>
//       <div className="text-base mt-1 flex gap-1.5 h-5 items-center ">
//         <p className="mt-1 text-center text group-hover:text-white transition text-slate-300">
//           <span className="gap-1.5 flex ">
//             <>
//               <span className="flex gap-1 items-center">
//                 <img
//                   src={chainIdToIcon(chainId)}
//                   className="w-5 h-5 filter invert"
//                 />
//                 {chainIdToLabel(chainId)}
//               </span>
//               &middot;
//             </>
//             <>
//               <span className="capitalize">Subgraph Bridge</span>
//               &middot;
//             </>
//             <span className="">
//               {/* {contracts.length}{" "}
//               {pluralize({
//                 singular: "Contract",
//                 count: contracts.length,
//               })} */}
//             </span>
//           </span>
//         </p>
//       </div>
//       <div className="mt-6 text-gray-300 text-sm line-clamp-3">
//         {/* {description} */}
//       </div>
//       <p className="absolute bottom-4 flex inset-x-4 gap-2">
//         <FancyNumber>
//           <span className="">0 Attestations</span>
//         </FancyNumber>
//         <FancyNumber>
//           <span className="">Last Attested 3 Days Ago</span>
//         </FancyNumber>
//       </p>
//     </Link>
//   );
// };

export const SubgraphBridgeItem = ({ bridge }: Props) => {
  const { id, config } = bridge;

  const {
    queryFirstChunk,
    queryLastChunk,
    responseDataOffset,
    responseDataType,
    subgraphDeploymentID,
    minimumSlashableGRT,
    proposalFreezePeriod,
  } = config;

  let date = new Date(0);

  return (
    <article className="py-10 sm:py-12">
      <Container>
        <div className="flex flex-col items-start">
          <h2 className="mt-2 text-lg font-bold text-slate-300">
            <Link to={urlBridgeItem(id)}>{subgraphDeploymentID}</Link>
          </h2>
          {/* <Date
            date={date}
            className="order-first font-mono text-sm leading-7 text-slate-500"
          /> */}
          <p className="mt-1 text-base leading-7 text-slate-700">Test</p>
          <div className="mt-4 flex items-center gap-4">
            <button
              type="button"
              className="flex items-center text-sm font-bold leading-6 text-sky-500 hover:text-sky-700 active:text-sky-900"
            ></button>
            <span
              aria-hidden="true"
              className="text-sm font-bold text-slate-400"
            >
              /
            </span>
            <Link
              to={urlBridgeItem(id)}
              className="flex items-center text-sm font-bold leading-6 text-sky-500 hover:text-sky-700 active:text-sky-900"
            >
              Show notes
            </Link>
          </div>
        </div>
      </Container>
    </article>
  );
};
