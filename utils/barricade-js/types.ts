import { PublicKey } from "@solana/web3.js";

export type NFTDataType = {
  mint: PublicKey;
  name: string;
  isFrozen: boolean;
  image: string;
};

export type ActiveTabTypes = "profile" | "locked" | "unlocked";
