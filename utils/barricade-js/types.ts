import { PublicKey } from "@solana/web3.js";

export type NFTDataType = {
  mint: PublicKey;
  name: string;
  isFrozen: boolean;
  image: string;
  tokenAcc: PublicKey;
};

export type ActiveTabTypes = "profile" | "locked" | "unlocked";
