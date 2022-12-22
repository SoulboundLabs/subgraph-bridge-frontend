import { formatEther } from "ethers/lib/utils.js";
import { useState } from "react";
import { ChevronDown, Mailbox } from "tabler-icons-react";
import { BridgeDetails } from "../BridgeDetails/BridgeDetails";
import { Button } from "../Button/Button";
import CodeEditor, { formatGraphQL } from "../Code/CodeEditor";
import { Container } from "../Layout/Container";
import { blockChains } from "../lib/blockchains";
import { classNames, formatNumber } from "../lib/utils";
import { SubgraphBridge } from "../store/types";
import { EtherscanSVG, TheGraphSVG } from "../SVG/SVG";

interface Props {
  bridge: SubgraphBridge;
  idx: number;
  setSelectedBridge: (bridge: SubgraphBridge) => void;
}

export const BridgeItem = ({ bridge, idx, setSelectedBridge }: Props) => {
  const { id, subgraphDeploymentID, fullQuery, minimumSlashableGRT, proposalFreezePeriod } = bridge;

  // console.log("~~~~~", dehexlifyQuery(id));
  let [isExpanded, setIsExpanded] = useState(false);

  return (
    <article className="py-6 overflow-hidden">
      <Container className="">
        <div className="flex items-center gap-16">
          <div className="flex flex-col items-start">
            <div className="flex justify-between w-full items-center">
              <h2 className="mt-2 text-lg font-bold text-slate-300">
                {idx !== undefined ? <span>#{idx + 1} &middot;</span> : null} {subgraphDeploymentID}
              </h2>

              <Button size="xs" Icon={Mailbox} reverse label="Submit Response" onClick={() => setSelectedBridge(bridge)} />
            </div>
            <div className="order-first font-mono text-sm leading-7 text-slate-500 flex items-center">
              <img src={blockChains[0].imgSrc} className="w-5 filter invert opacity-40 mr-2 -mt-0.5" /> &middot; {proposalFreezePeriod} Block Challenge Window
              &middot; {formatEther(minimumSlashableGRT).replace(".0", "")} GRT Minimum Slashable
            </div>
            <div className="mt-1 text-base leading-7 text-slate-700 w-full">
              <CodeEditor readOnly value={formatGraphQL(fullQuery)} />
            </div>
            {/* <UserAddress address="0x4040" /> */}
            <div className="mt-4 flex items-center gap-4">
              <button type="button" className="flex items-center text-sm group font-bold gap-2 leading-6 text-sky-500 hover:text-sky-700 active:text-sky-900">
                <EtherscanSVG className="w-4 bg-slate-300 group-hover:bg-slate-400 h-4 rounded p-0.5" />
                Etherscan
              </button>
              <span aria-hidden="true" className="text-sm font-bold text-slate-400">
                /
              </span>
              <a
                target={"_blank"}
                href={`https://ipfs.io/ipfs/${subgraphDeploymentID}`}
                className="flex items-center text-sm group font-bold gap-2 leading-6 text-sky-500 hover:text-sky-700 active:text-sky-900"
              >
                <TheGraphSVG className="w-4 bg-purple-700 group-hover:bg-purple-800 text-white h-4 rounded p-0.5" />
                IPFS
              </a>
              <span aria-hidden="true" className="text-sm font-bold text-slate-400">
                /
              </span>
              <a
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center cursor-pointer text-sm group font-bold gap-2 leading-6 text-sky-500 hover:text-sky-700 active:text-sky-900"
              >
                View Responses
                <ChevronDown className={classNames("w-5 transition-transform", isExpanded && "transform rotate-180")} />
              </a>
            </div>
          </div>
        </div>
      </Container>

      {isExpanded && <BridgeDetails bridge={bridge} />}
    </article>
  );
};
