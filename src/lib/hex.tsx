import bs58 from "bs58";
import { ethers } from "ethers";

export function encodeBase58(hex) {
  return bs58.encode(
    Buffer.concat([
      Buffer.from("1220", "hex"),
      Buffer.from(hex.substring(2), "hex"),
    ])
  );
}

export const hexlifyQuery = (value: string) =>
  ethers.utils.hexlify(ethers.utils.toUtf8Bytes(value));

export const hexlifySubgraphDeploymentID = (value: string) =>
  ethers.utils.hexlify(ethers.utils.base58.decode(value).slice(2));
