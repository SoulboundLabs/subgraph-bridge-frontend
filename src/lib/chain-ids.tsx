import { blockChains } from "./blockchains";
import { capitalizeFirstLetter } from "./string";

export const chainIds = blockChains.filter(({ value }) => value !== undefined);

export const chainIdToLabel = (chainId: number) => {
  const chain = chainIds.find((c) => c.value === chainId);
  return chain ? capitalizeFirstLetter(chain.label) : "Unknown";
};

export const chainIdToIcon = (chainId: number) => {
  const chain = chainIds.find((c) => c.value === chainId);
  return chain ? chain.imgSrc : "Unknown";
};
