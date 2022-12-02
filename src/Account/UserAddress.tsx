import { memo, ReactNode } from "react";
import Jdenticon from "react-jdenticon";
import { classNames, formatAddress } from "../lib/utils";

interface Props {
  address: string;
  ens?: string;
  linkable?: boolean;
  extra?: ReactNode;
  size?: number;
}

export const urlEtherscanWalletAddress = (address: string) =>
  `https://etherscan.io/address/${address}`;

export const UserAddress = memo(
  ({ address, extra, size = 48, linkable }: Props) => {
    const displayName = address.includes(".eth")
      ? address
      : formatAddress(address);
    const component = (
      <a
        target="_blank"
        href={linkable && urlEtherscanWalletAddress(address)}
        className={`
      ${linkable && "hover:text-sky-300 cursor-pointer"}
        relative
        group
        hover:bg-opacity-75
        z-20
        transition
        flex
        w-full m-auto
        duration-200
        font-semibold
        text-xs
        `}
      >
        <Jdenticon
          size={`${size}`}
          value={address.toLocaleLowerCase()}
          className="absolute"
        />

        <div
          className={classNames(
            `truncate flex-col text-left text-sm justify-start flex w-full pl-2.5`,
            extra ? "pt-1" : "pt-1.5"
          )}
        >
          <div className="text-sm">{displayName}</div>
          {extra && (
            <div className="font-medium text-xs text-slate-300">{extra}</div>
          )}
        </div>
      </a>
    );

    return component;
  }
);
