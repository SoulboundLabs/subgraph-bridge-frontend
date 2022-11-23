import { ConnectKitButton } from "connectkit";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { UserAddress } from "../Account/UserAddress";
import { MenuDropdown } from "../Menu/MenuDropdown";

export const SBT_ACCESS_TOKEN = "sbt-access-token";

export const walletToAccount = (wallet) => {
  if (wallet) {
    const { name, avatar } = wallet?.accounts[0].ens ?? {};
    return {
      address: wallet.accounts[0].address,
      balance: wallet.accounts[0].balance,
      ens: { name, avatar: avatar?.url },
    };
  } else {
    return null;
  }
};

export function ConnectWallet() {
  const { address, connector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div>
      {address ? (
        <MenuDropdown
          className={(open) =>
            `w-full  bg-slate-700/50 hover:bg-slate-600/50 text-white group-hover:bg-slate-600/50 h-10 pr-3 pl-3.5 text-base rounded-md flex font-semibold disabled:opacity-50 disabled:cursor-not-allowed  transition justify-center whitespace-nowrap items-center`
          }
          menuOptions={[{ label: "Disconnect", onClick: disconnect }]}
          label={
            <span className="-ml-1">
              <UserAddress address={address} size={32} />
            </span>
          }
        />
      ) : (
        <ConnectKitButton />
      )}
    </div>
  );
}
