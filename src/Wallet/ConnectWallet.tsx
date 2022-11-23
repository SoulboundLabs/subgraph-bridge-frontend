import { useConnectWallet, useWallets } from "@web3-onboard/react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Wallet } from "tabler-icons-react";
import { UserAddress } from "../Account/UserAddress";
import { Button } from "../Button/Button";
import { useReadyToTransact } from "../lib/wallet";
import { MenuDropdown } from "../Menu/MenuDropdown";
import * as store from "../store/store";

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
  const [
    {
      wallet, // the wallet that has been connected or null if not yet connected
    },
    connect, // function to call to initiate user to connect wallet
    disconnect, // function to call to with wallet<DisconnectOptions> to disconnect wallet
  ] = useConnectWallet();

  // This hook allows you to track the state of all the currently connected wallets
  const connectedWallets = useWallets();
  // const [{}, setChain] = useSetChain();

  // The user's currently connected account
  const [account, setAccount] = useRecoilState(store.userAccount);

  const storageWallets = "storageWallets";

  useEffect(() => {
    if (!connectedWallets.length) return;

    const connectedWalletsLabelArray = connectedWallets.map(
      ({ label }) => label
    );
    window.localStorage.setItem(
      storageWallets,
      JSON.stringify(connectedWalletsLabelArray)
    );
  }, [connectedWallets]);

  useEffect(() => {
    const previouslyConnectedWallets = JSON.parse(
      window.localStorage.getItem(storageWallets)
    );

    if (previouslyConnectedWallets?.length) {
      async function setWalletFromLocalStorage() {
        await connect({
          autoSelect: {
            label: previouslyConnectedWallets[0],
            disableModals: true,
          },
        });
      }
      setWalletFromLocalStorage();
    }
  }, [connect]);

  useEffect(() => {
    if (wallet) {
      setAccount(walletToAccount(wallet));
    } else {
      setAccount(null);
    }
  }, [wallet]);

  const readyToTransact = useReadyToTransact();

  const disconnectWallet = () => {
    if (wallet?.label) {
      window.localStorage.removeItem(storageWallets);
      disconnect({ label: wallet?.label });
      setAccount(null);
    }
  };

  return (
    <div>
      {account ? (
        <MenuDropdown
          className={(open) =>
            `w-full  bg-slate-700/50 hover:bg-slate-600/50 text-white group-hover:bg-slate-600/50 h-10 pr-3 pl-3.5 text-base rounded-md flex font-semibold disabled:opacity-50 disabled:cursor-not-allowed  transition justify-center whitespace-nowrap items-center`
          }
          menuOptions={[{ label: "Disconnect", onClick: disconnectWallet }]}
          label={
            <span className="-ml-1">
              <UserAddress address={account.address} size={32} />
            </span>
          }
        />
      ) : (
        <Button
          onClick={readyToTransact}
          size="lg"
          Icon={Wallet}
          label={
            <>
              <span className="hidden sm:block">Connect Wallet</span>
              <span className="block sm:hidden">Connect</span>
            </>
          }
        />
      )}
    </div>
  );
}
