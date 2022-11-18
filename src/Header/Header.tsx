import { Link } from "react-router-dom";
import { Home2 } from "tabler-icons-react";
import soulboundStudioLogo from "../assets/logos/soulbound-studio.svg";
import soulboundSOnly from "../assets/logos/thick-s.svg";
import { ConnectWallet } from "../Wallet/ConnectWallet";
import { HeaderLink } from "./HeaderLink";

export function Header({}) {
  return (
    <div className="py-2.5 relative z-50 bg-slate-900 w-full sm:pl-6 sm:pr-4 flex flex-wrap space-y-4 lg:space-y-0  text-center items-center justify-center sm:justify-between border-b-sky-300/50 border-b text-slate-400">
      <Link to={"/"}>
        <img
          src={soulboundStudioLogo}
          className="h-10 cursor-pointer hidden sm:block"
        />
        <img
          src={soulboundSOnly}
          className="h-10 cursor-pointer block sm:hidden"
        />
      </Link>
      <div className="sm:gap-3 font-semibold text-sky-300 mr-3 flex items-center justify-end whitespace-nowrap">
        <div>
          <HeaderLink
            Icon={Home2}
            label="Bridges"
            href={"https://thegraph.com"}
          />
        </div>
        <div>
          <HeaderLink
            Icon={Home2}
            label="Query"
            href={"https://thegraph.com"}
          />
        </div>
        <div className="ml-1">
          <ConnectWallet />
        </div>
      </div>
    </div>
  );
}
