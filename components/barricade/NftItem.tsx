import { PublicKey } from "@solana/web3.js";
import { useContext, useEffect, useState } from "react";
import { SelectedNftContext } from "../../contexts/SelectedNftContext";

type NftItem = {
  mint: PublicKey;
  name: string;
  image: string;
};

const NftItem = ({ mint, name, image }: NftItem) => {
  const [splitName, setSplitName] = useState<string[]>([]);

  //@ts-ignore
  const { selectedNftMint, setSelectedNftMint } =
    useContext(SelectedNftContext);

  function handleSelectNft(mint: PublicKey) {
    setSelectedNftMint(() => {
      if (selectedNftMint === undefined) {
        return mint;
      } else if (selectedNftMint !== undefined && selectedNftMint !== mint) {
        return mint;
      } else {
        return undefined;
      }
    });
  }

  function splitNameAndNumber() {
    if (!name.includes("#")) return;

    const split = name.split("#");
    setSplitName(split);
    // console.log(split);
  }

  useEffect(() => {
    splitNameAndNumber();
  }, [name]);

  return (
    <div
      onClick={() => handleSelectNft(mint)}
      className={`bg-nftItemBackground grid justify-center p-2 rounded-xl mr-12 mt-12 shadow-xl hover:shadow-2xl transition cursor-pointer ${
        selectedNftMint === mint ? "outline outline-white outline-2" : ""
      }`}
    >
      <div className="flex justify-center">
        <img
          src={image}
          alt="nft-image"
          className="w-[200px] h-[200px] rounded-md object-cover"
        />
      </div>
      {splitName.length !== 0 ? (
        <div className="flex justify-between">
          <p className="font-medium text-white">{splitName[0]}</p>
          <p className="font-medium text-white">#{splitName[1]}</p>
        </div>
      ) : (
        <p className="font-medium text-white">{name}</p>
      )}
    </div>
  );
};

export default NftItem;
