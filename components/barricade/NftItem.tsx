import { PublicKey } from "@solana/web3.js";
import { useContext } from "react";
import { SelectedNftContext } from "../../contexts/SelectedNftContext";

type NftItem = {
  mint: PublicKey;
  name: string;
  image: string;
};

const NftItem = ({ mint, name, image }: NftItem) => {
  const { selectedNftMint, setSelectedNftMint } =
    useContext(SelectedNftContext);

  function handleSelectNft(mint: PublicKey) {
    setSelectedNftMint(mint);
  }

  return (
    <div
      onClick={() => handleSelectNft(mint)}
      className={`bg-nftItemBackground grid justify-center p-4 rounded-xl mr-12 mt-12 shadow-xl hover:shadow-2xl transition cursor-pointer ${
        selectedNftMint === mint ? "outline outline-white outline-2" : ""
      }`}
    >
      <div className="flex justify-center">
        <img
          src={image}
          alt="nft-image"
          className="w-[200px] h-[200px] rounded-md"
        />
      </div>
      <p className="font-medium text-white">{name}</p>
    </div>
  );
};

export default NftItem;
