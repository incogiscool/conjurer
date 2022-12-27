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
import { NFTDataType, LockMultipleNftsType } from "./types";
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

  public async lockNFT(nftMint: PublicKey, nftTokenAcc: PublicKey) {
    if (!nftMint) throw new Error("nftMint argument Empty!");
    //fetch delegate and see if corresponds with user

    const nft = await this.metaplex.nfts().findByMint({ mintAddress: nftMint });
    //@ts-ignore
    const edition = nft.edition.address;
    const address = nft.address;

    // const acc = await this.connection.getTokenAccountsByOwner(
    //   //@ts-ignore
    //   this.publicKey,
    //   { mint: nftMint }
    // );

    // const nftTokenAcc = acc.value[0].pubkey;

    // const nftTokenAcc = await getAssociatedTokenAddress(
    //   nftMint,
    //   //@ts-ignore
    //   this.publicKey
    // );

    // await this.metaplex.tokens().approveDelegateAuthority({
    //   mintAddress: nftMint,
    //   //@ts-ignore
    //   delegateAuthority: this.publicKey,
    // });

    const delegateInstruction = this.metaplex
      .tokens()
      .builders()
      .approveDelegateAuthority({
        mintAddress: nftMint,
        //@ts-ignore
        delegateAuthority: this.publicKey,
      })
      .getInstructions()[0];

    // console.log("Approved Delegation.");

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
    console.log(
      "🚀 ~ file: index.ts:86 ~ Barricade ~ lockNFT ~ edition",
      edition
    );

    //sending the transaction

    const transaction = new Transaction().add(
      delegateInstruction,
      lockTransaction,
      fee
    );
    let { blockhash } = await this.connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    //@ts-ignore
    transaction.feePayer = this.publicKey;

    //@ts-ignore
    const signedTransaction = await this.wallet.signTransaction(transaction);
    const transactionAddress = await this.connection.sendRawTransaction(
      signedTransaction.serialize()
    );

    const trasnactionConfirm = await this.connection.confirmTransaction(
      transactionAddress,
      "finalized"
    );
    // console.log(trasnactionConfirm);

    return transactionAddress;
  }

  public async lockMultipleNFTs(input: LockMultipleNftsType[]) {
    if (!input) throw new Error("input argument Empty!");
    console.log("input:", input);

    const transaction = new Transaction();

    const fee = SystemProgram.transfer({
      //@ts-ignore
      fromPubkey: this.publicKey,
      toPubkey: this.feeWallet,
      lamports: LAMPORTS_PER_SOL * lockNFTFee,
    });

    await Promise.all(
      input.map(async (nft) => {
        console.log("nft", nft);
        const nftFetch = await this.metaplex
          .nfts()
          .findByMint({ mintAddress: nft.nftMint });
        //@ts-ignore
        const edition = nftFetch.edition.address;
        const address = nftFetch.address;
        console.log(
          "🚀 ~ file: index.ts:134 ~ Barricade ~ input.map ~ edition",
          edition
        );
        console.log(
          "🚀 ~ file: index.ts:135 ~ Barricade ~ input.map ~ address = nftFetch.address",
          address
        );

        const delegateInstruction = this.metaplex
          .tokens()
          .builders()
          .approveDelegateAuthority({
            mintAddress: nft.nftMint,
            //@ts-ignore
            delegateAuthority: this.publicKey,
          })
          .getInstructions()[0];

        console.log("delegate tx created");

        const lockTransaction = createFreezeDelegatedAccountInstruction({
          //@ts-ignore
          delegate: this.publicKey,
          mint: address,
          edition,
          tokenAccount: nft.nftTokenAcc,
        });

        transaction.add(delegateInstruction, lockTransaction, fee);
      })
    );

    console.log("lock tx created");

    let { blockhash } = await this.connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    //@ts-ignore
    transaction.feePayer = this.publicKey;

    console.log(transaction);

    //@ts-ignore
    const signedTransaction = await this.wallet.signTransaction(transaction);
    const transactionAddress = await this.connection.sendRawTransaction(
      signedTransaction.serialize()
    );

    const trasnactionConfirm = await this.connection.confirmTransaction(
      transactionAddress,
      "finalized"
    );
    // console.log(trasnactionConfirm);

    return transactionAddress;
  }

  public async unlockNFT(nftMint: PublicKey) {
    //fetch delegate and see if corresponds with user

    const transaction = await this.metaplex.nfts().thawDelegatedNft(
      {
        mintAddress: nftMint,
        //@ts-ignore

        delegateAuthority: this.wallet,
      },
      { commitment: "finalized" }
    );

    return transaction.response.signature;
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
        console.log("Fetching Token Account for:", nft.name);

        // const tokenAcc = await getAssociatedTokenAddress(
        //   mint,
        //   //@ts-ignore
        //   this.publicKey
        // );

        const acc = await this.connection.getTokenAccountsByOwner(
          //@ts-ignore
          this.publicKey,
          { mint }
        );

        const tokenAcc = acc.value[0].pubkey;

        console.log("Token Account: ", tokenAcc.toBase58());

        console.log("Fetching URI Info for: ", nft.name);
        const uriFetch = await (await fetch(nft.uri)).json();
        // const isFrozen = false;
        console.log("Checking if frozen: ", nft.name);
        const { isFrozen } = await getAccount(this.connection, tokenAcc);

        const name = uriFetch.name;
        const image = uriFetch.image;

        // console.log(
        //   `Mint: ${mint.toBase58()}\nToken Account: ${tokenAcc.toBase58()}`
        // );
        console.log("Name: ", name);
        console.log("Is locked: ", isFrozen);

        return {
          mint,
          name,
          image,
          isFrozen,
          tokenAcc,
        };
      })
    );
    const filteredFromUndefined = allNFTs.filter((nft) => nft !== null);

    //@ts-ignore
    return filteredFromUndefined;
  }

  public async getWalletBalance() {
    //@ts-ignore
    return await this.metaplex.rpc().getBalance(this.publicKey);
  }
}
