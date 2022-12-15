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
    address: "0x0FceDA550ec31a5228fE58D5024eca71CdABf93f",
    subgraphUrl: "https://api.studio.thegraph.com/query/13658/subgraphbridge/1.1.4",
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
