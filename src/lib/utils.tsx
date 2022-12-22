export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const formatAddress = (address: string | undefined, truncateAmount = 4) =>
  address ? (
    <span className="inline-flex items-center">
      {address.slice(0, 2 + truncateAmount)}
      <span style={{ letterSpacing: "0px" }} className="inline-block">
        ...
      </span>
      {address.slice(-truncateAmount, address.length)}
    </span>
  ) : (
    ""
  );

export const urlHandleToId = (urlHandle: string) => {
  return urlHandle.split("-").join(" ");
};

export const idToUrlHandle = (id: string = "") => {
  return id.toLowerCase().split(" ").join("-");
};

export const romanNumerals = ["I", "II", "III", "IV", "V"];

export const chainIdToEtherscan = (chainId: number) => {
  switch (chainId) {
    case 1:
      return "https://etherscan.io";
    case 3:
      return "https://ropsten.etherscan.io";
    case 4:
      return "https://rinkeby.etherscan.io";
    case 42:
      return "https://kovan.etherscan.io";
    case 137:
      return "https://polygonscan.com/";
    default:
      return "https://etherscan.io";
  }
};

export const etherscanLink = (chainId: number, address: string) => {
  return `${chainIdToEtherscan(chainId)}/address/${address}`;
};
