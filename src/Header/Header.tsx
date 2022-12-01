import { Link } from "react-router-dom";
import { BuildingBridge, NewSection } from "tabler-icons-react";
import soulboundSOnly from "../assets/logos/thick-s.svg";
import { ConnectWallet } from "../Wallet/ConnectWallet";
import { HeaderLink } from "./HeaderLink";

export function Header({}) {
  return (
    <div
      id="header"
      className="py-2.5 relative z-50 bg-slate-900 w-full sm:pl-6 sm:pr-4 flex flex-wrap space-y-4 lg:space-y-0  text-center items-center justify-center sm:justify-between border-b-sky-300/50 border-b text-slate-400"
    >
      <Link to={"/"}>
        <div className="flex items-center gap-4">
          <img src={soulboundSOnly} className="h-10 cursor-pointer block " />
          <div className="uppercase tracking-wide text-left text-xl text-white/90">
            <span className="font-normal">Subgraph</span>{" "}
            <span className="font-light">Bridge</span>
          </div>
        </div>
      </Link>

      <div className="sm:gap-3 font-semibold text-sky-300 mr-3 flex items-center justify-end whitespace-nowrap">
        <div>
          <HeaderLink Icon={BuildingBridge} label="Bridges" href={"/"} />
        </div>
        <div>
          <HeaderLink Icon={NewSection} label="Create" href={"/create"} />
        </div>

        <div className="ml-1 flex items-center gap-3">
          <ConnectWallet />
        </div>
      </div>
    </div>
  );
}
