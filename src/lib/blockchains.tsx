import ethereum from "../assets/supported-protocols/ethereum.svg";
import goerli from "../assets/supported-protocols/goerli.svg";
import gnosis from "../assets/supported-protocols/xdai.svg";

export const ETHEREUM = "Mainnet (Coming Soon)";
export const GOERLI = "Goerli Testnet";
export const GNOSIS = "Gnosis (Coming Soon)";

export const blockChains = [
  {
    imgSrc: goerli,
    label: GOERLI,
    value: "0x5",
  },
  {
    imgSrc: ethereum,
    label: ETHEREUM,
    value: "0x1",
    comingSoon: true,
  },

  { imgSrc: gnosis, label: GNOSIS, value: "0x64", comingSoon: true },
];

export const blockChainIds = blockChains
  .filter((b) => !b.comingSoon)
  .map((b) => b.value);
