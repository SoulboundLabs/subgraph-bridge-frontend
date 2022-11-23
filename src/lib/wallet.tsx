import { useConnectWallet } from "@web3-onboard/react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import subgraphBridgeABI from "../assets/abis/subgraph-bridge-abi.json";

export const useReadyToTransact = () => {
  const [
    {
      wallet, // the wallet that has been connected or null if not yet connected
    },
    connect, // function to call to initiate user to connect wallet
  ] = useConnectWallet();

  return async () => {
    if (!wallet) {
      const walletSelected = (await connect({})) as any;
      if (!walletSelected) return false;
    }

    return true;
  };
};

export const useGetProvider = () => {
  const [provider, setProvider] = useState(null);
  const [
    {
      wallet, // the wallet that has been connected or null if not yet connected
    },
  ] = useConnectWallet();

  useEffect(() => {
    if (!wallet?.provider) {
      setProvider(null);
    } else {
      const newProvider = new ethers.providers.Web3Provider(
        wallet.provider,
        "any"
      );
      setProvider(newProvider);
    }
  }, [wallet]);

  return provider;
};

const goerliAddress = "0xebD596E84E8fcc8040e42D233eb2B39257302EEe";

export const useSubmitSubgraphBridge = () => {
  const readyToTransact = useReadyToTransact();
  const provider = useGetProvider();

  return async (txValues) => {
    if (!(await readyToTransact())) return;

    const signer = provider.getUncheckedSigner();

    console.log("errrrrrr");
    const subgraphBridgeContract = new ethers.Contract(
      "0xb8c12850827ded46b9ded8c1b6373da0c4d60370",
      subgraphBridgeABI,
      signer
    );
    console.log("eeeeeeasdf");

    const txDetails = {
      value: 1000000000000000,
    };

    const tx = await subgraphBridgeContract.createSubgraphBridge(txDetails);

    // await tx.wait();
  };
};
