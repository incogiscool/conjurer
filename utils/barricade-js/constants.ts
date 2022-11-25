import { PublicKey } from "@solana/web3.js";

export const connectionCluster: string =
  "https://methodical-polished-wave.solana-devnet.discover.quiknode.pro/0059da60d946c012e6df2ad3dce33abe2adeb7c5/";
export const lockNFTFee: number = 0.01;
export const barricadeTitle: string = "Barricade - Keeping your tokens secure.";
export const barricadeFeeWallet: PublicKey = new PublicKey(
  "ujRNqNevjXDkxwpsCTtXReLuMsEe84YEBSKPCf6UoA8"
);
export const prefix: string = "/barricade";

export const barricadeVersion: string = "Alpha Release (v1.0)";
