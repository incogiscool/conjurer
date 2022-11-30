import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";
import {
  getAccount,
  getAssociatedTokenAddress,
  getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";
import { createFreezeDelegatedAccountInstruction } from "@metaplex-foundation/mpl-token-metadata";
import { NFTDataType } from "./types";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { barricadeFeeWallet, lockNFTFee } from "./constants";

export class Barricade {
  constructor(
    readonly wallet: WalletContextState,
    readonly publicKey: PublicKey | null,
    readonly connection: Connection,
    readonly metaplex = Metaplex.make(connection).use(
      walletAdapterIdentity(wallet)
    ),
    readonly feeWallet = barricadeFeeWallet
  ) {}
  public async lockNFT(nftMint: PublicKey) {
    const nft = await this.metaplex.nfts().findByMint({ mintAddress: nftMint });
    //@ts-ignore
    const edition = nft.edition.address;
    const address = nft.address;

    const account = await getOrCreateAssociatedTokenAccount(
      this.connection,
      //@ts-ignore
      this.wallet,
      nftMint,
      this.publicKey
    );

    const nftTokenAcc = account.address;

    await this.metaplex.tokens().approveDelegateAuthority({
      mintAddress: nftMint,
      //@ts-ignore
      delegateAuthority: this.publicKey,
    });

    console.log("Approved Delegation.");

    const fee = SystemProgram.transfer({
      //@ts-ignore
      fromPubkey: this.publicKey,
      toPubkey: this.feeWallet,
      lamports: LAMPORTS_PER_SOL * lockNFTFee,
    });

    const lockTransaction = createFreezeDelegatedAccountInstruction({
      //@ts-ignore
      delegate: this.publicKey,
      mint: address,
      edition,
      tokenAccount: nftTokenAcc,
    });

    //sending the transaction

    const transaction = new Transaction().add(lockTransaction, fee);
    let { blockhash } = await this.connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    //@ts-ignore
    transaction.feePayer = this.publicKey;

    //@ts-ignore
    const signedTransaction = await this.wallet.signTransaction(transaction);
    const transactionAddress = await this.connection.sendRawTransaction(
      signedTransaction.serialize()
    );

    await this.connection.confirmTransaction(transactionAddress);

    console.log(transactionAddress);
  }

  public async unlockNFT(nftMint: PublicKey) {
    const transaction = await this.metaplex.nfts().thawDelegatedNft({
      mintAddress: nftMint,
      //@ts-ignore

      delegateAuthority: this.wallet,
    });

    console.log(transaction.response.signature);
  }

  public async fetchAllNFTs(): Promise<NFTDataType[]> {
    const nfts = await this.metaplex.nfts().findAllByOwner({
      //@ts-ignore
      owner: this.publicKey,
    });

    const allNFTs: NFTDataType[] = await Promise.all(
      nfts.map(async (nft) => {
        //@ts-ignore
        const mint = nft.mintAddress;
        //@ts-ignore
        const tokenAcc = await getAssociatedTokenAddress(mint, this.publicKey);
        const uri = nft.uri;
        const uriFetch = await (await fetch(uri)).json();

        console.log(
          `Mint: ${mint.toBase58()}\nToken Account: ${tokenAcc.toBase58()}`
        );

        const name = uriFetch.name;
        const image = uriFetch.image;

        console.log("Name: ", name);
        const { isFrozen } = await getAccount(this.connection, tokenAcc);

        console.log("Is locked: ", isFrozen);

        return {
          mint,
          name,
          image,
          isFrozen,
        };
      })
    );

    return allNFTs;
  }

  public async getWalletBalance() {
    //@ts-ignore
    return await this.metaplex.rpc().getBalance(this.publicKey);
  }
}
