import { atom } from "recoil";
import { recoilPersist } from "./persistAtom";
import { Account } from "./types";

const { persistAtom } = recoilPersist();

export const userAccount = atom<Account>({
  key: "@userAccount",
  default: null,
  effects: [persistAtom],
});
