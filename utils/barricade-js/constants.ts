import { PublicKey } from "@solana/web3.js";

export const connectionCluster: string =
  "https://flashy-proportionate-breeze.solana-mainnet.discover.quiknode.pro/49db30a0b4eb3f8d07e88d844e9a24ddbdf86dc9/";
export const lockNFTFee: number = 0.01;
export const barricadeTitle: string = "Barricade - Keeping your tokens secure.";
export const barricadeFeeWallet: PublicKey = new PublicKey(
  "ujRNqNevjXDkxwpsCTtXReLuMsEe84YEBSKPCf6UoA8" //-Snowflake Wallet
);
export const prefix: string = "/barricade";

export const barricadeVersion: string = "Pre-Production Alpha Release (v1.0)";
