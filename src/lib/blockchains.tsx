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
    address: "0x6ac731f7f91c90930f07acb99d696125c59f9477",
    subgraphUrl: "https://api.studio.thegraph.com/query/32033/sbs/4",
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

export const blockChainIds = blockChains
  .filter((b) => !b.comingSoon)
  .map((b) => b.value);
