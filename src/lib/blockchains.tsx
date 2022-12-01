import ethereum from "../assets/supported-protocols/ethereum.svg";
import goerli from "../assets/supported-protocols/goerli.svg";
import gnosis from "../assets/supported-protocols/xdai.svg";

export const ETHEREUM = "Mainnet (Soon™)";
export const GOERLI = "Goerli Testnet";
export const GNOSIS = "Gnosis (Soon™)";

export const blockChains = [
  {
    imgSrc: goerli,
    label: GOERLI,
    value: 5,
  },
  {
    imgSrc: ethereum,
    label: ETHEREUM,
    value: 1,
    comingSoon: true,
  },

  { imgSrc: gnosis, label: GNOSIS, value: 64, comingSoon: true },
];

export const blockChainIds = blockChains
  .filter((b) => !b.comingSoon)
  .map((b) => b.value);
