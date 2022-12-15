import ethereum from "../assets/supported-protocols/ethereum.svg";
import goerli from "../assets/supported-protocols/goerli.svg";
import gnosis from "../assets/supported-protocols/xdai.svg";

export const ETHEREUM = "Mainnet (Soon™)";
export const GOERLI = "Goerli Testnet";
export const GNOSIS = "Gnosis (Soon™)";

export const blockChainMap = {
  [GOERLI]: {
    imgSrc: goerli,
    label: GOERLI,
    value: 5,
    address: "0xDDDCB682b38B49130b3B208CbbeFbf58a86E77aA",
    subgraphUrl: "https://api.studio.thegraph.com/query/13658/subgraphbridge/0.69",
    comingSoon: false,
  },
  [ETHEREUM]: {
    imgSrc: ethereum,
    label: ETHEREUM,
    value: 1,
    comingSoon: true,
  },

  [GNOSIS]: { imgSrc: gnosis, label: GNOSIS, value: 64, comingSoon: true },
};

export const blockChains = Object.values(blockChainMap);

export const blockChainIds = blockChains.filter((b) => !b.comingSoon).map((b) => b.value);
