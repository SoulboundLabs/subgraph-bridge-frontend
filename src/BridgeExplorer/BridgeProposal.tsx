import Jdenticon from "react-jdenticon";
import { formatAddress } from "../lib/utils";
import { FancyNumber } from "../Tag/FancyNumber";
import { BridgeProposalSteps } from "./BridgeProposalSteps";

export const BridgeProposal = ({ proposal }) => {
  return (
    <div>
      <div className="transition-colors relative group rounded-lg bg-slate-700/50 text-white hover:bg-slate-600/50">
        <div className="py-2 px-3  flex items-center w-full justify-between border-b border-slate-500">
          <div className="flex items-center w-full gap-8">
            <div className="text-left flex gap-3 items-center">
              <div>
                <Jdenticon
                  size={`30`}
                  value={proposal.author.toLocaleLowerCase()}
                  className="absolute"
                />
              </div>

              <div className="w-30">
                <div className="text-sm font-semibold text-white">
                  {formatAddress(proposal.author)}
                </div>
                <div className="-mt-0.5 text-xs font-semibold text-slate-300">
                  Indexer
                </div>
              </div>

              <div className="w-30">
                <div className="text-sm font-semibold text-white">190k</div>
                <div className="-mt-0.5 text-xs font-semibold text-slate-300">
                  Staked GRT
                </div>
              </div>
            </div>

            <div className="w-30">
              <div className="text-sm font-semibold flex items-center text-white">
                <span className="mr-1">12345012</span>
              </div>
              <div className="-mt-0.5 text-xs font-medium text-slate-300">
                Block
              </div>
            </div>
          </div>

          <div className="text-sm flex gap-3  text-right font-semibold text-white">
            <FancyNumber>Certified</FancyNumber>
          </div>
        </div>
        <div>
          <div className="px-3 py-6 font-mono text-center">0xfoobar</div>
        </div>
        <div className="pb-2 w-full gap-8">
          <BridgeProposalSteps />
          {/* <Button label="Certify Proposal" palette="secondary" size="xs" /> */}
        </div>
      </div>
    </div>
  );
};
