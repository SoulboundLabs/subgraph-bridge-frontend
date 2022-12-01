import Jdenticon from "react-jdenticon";
import { Edit, ExternalLink } from "tabler-icons-react";
import { HrText } from "../Hr/HrText";
import { formatAddress } from "../lib/utils";

export const BridgeProposal = ({ proposal }) => {
  return (
    <div>
      <div className="transition-colors relative group rounded-lg bg-slate-700/50 text-white hover:bg-slate-600/50">
        <div className="py-2 px-3  flex items-center w-full justify-between border-b border-slate-300">
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
                <div className="text-sm font-semibold text-white">32341234</div>
                <div className="-mt-0.5 text-xs font-semibold text-slate-300">
                  Block Proposed
                </div>
              </div>
            </div>

            <div className="w-30">
              <div className="text-sm font-semibold flex items-center text-white">
                <span className="mr-1">5012</span>
              </div>
              <div className="-mt-0.5 text-xs font-medium text-slate-300">
                Block Window
              </div>
            </div>
          </div>

          <div className="text-sm flex gap-3  text-right font-semibold text-white">
            <Edit
              // onClick={editSmartContractModal}
              className="cursor-pointer opacity-50 hover:opacity-100"
            />
            <a
              // href={urlEtherscanContractAddress(smartContract.address)}
              target="_blank"
            >
              <ExternalLink className="cursor-pointer opacity-50 hover:opacity-100" />
            </a>
          </div>
        </div>
        <HrText>Data</HrText>
        <div>
          <div className="px-3 py-2 font-mono text-center">0xfoobar</div>
        </div>
      </div>
    </div>
  );
};
