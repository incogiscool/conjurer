import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
import { createContext, useContext, useEffect, useState } from "react";
import DashboardSidebar from "../../../components/barricade/DashboardSidebar";
import NftItem from "../../../components/barricade/NftItem";
import { SelectedNftContext } from "../../../contexts/SelectedNftContext";
import MainContainer from "../../../components/MainContainer";
import { Barricade } from "../../../utils/barricade-js";
import {
  barricadeTitle,
  connectionCluster,
} from "../../../utils/barricade-js/constants";
import { ActiveTabTypes, NFTDataType } from "../../../utils/barricade-js/types";
import SearchBar from "../../../components/barricade/SearchBar";

const Dashboard = () => {
  const [unlockedNfts, setUnlockedNfts] = useState<NFTDataType[]>([]);
  const [lockedNfts, setLockedNfts] = useState<NFTDataType[]>([]);

  const [activeTab, setActiveTab] = useState<ActiveTabTypes>("unlocked");

  const [selectedNftMint, setSelectedNftMint] = useState<PublicKey | undefined>(
    undefined
  );

  const [error, setError] = useState("");

  const wallet = useWallet();
  const connection = new Connection(connectionCluster);
  let barricade = new Barricade(wallet, wallet.publicKey, connection);

  async function fetchAllNfts() {
    try {
      if (!wallet.connected) return;

      const res = await barricade.fetchAllNFTs();

      const unlockedNfts = res.filter((nft) => nft.isFrozen === false);
      const lockedNfts = res.filter((nft) => nft.isFrozen === true);

      //add condition where if no nfts in wallet put msg on screen
      //reset nft state when wallet disconnected
      //add toast for errors instead of useState and for successes

      setUnlockedNfts(unlockedNfts);
      setLockedNfts(lockedNfts);
    } catch (err: any) {
      console.log(err);
      setError(err.message);
    }
  }

  useEffect(() => {
    if (wallet.connected) {
      fetchAllNfts();
    } else {
      setError("");
      setUnlockedNfts([]);
      setLockedNfts([]);
      return;
    }
  }, [wallet]);

  async function lockNft() {
    try {
      if (!selectedNftMint || selectedNftMint === undefined) {
        throw new Error("Please select an NFT.");
      }

      const res = await barricade.lockNFT(selectedNftMint);
      console.log(res);

      location.reload();
    } catch (err: any) {
      console.log(err);
      setError(err.message);
    }
  }

  async function unlock() {
    const res = await barricade.unlockNFT(lockedNfts[0].mint);
    console.log(res);

    location.reload();
  }

  return (
    <MainContainer title={barricadeTitle} className="min-h-screen">
      <SelectedNftContext.Provider
        //@ts-ignore
        value={{ selectedNftMint, setSelectedNftMint }}
      >
        <div className="flex">
          <DashboardSidebar />
          {wallet.connected ? (
            <div className="m-16 w-screen">
              <div className="flex justify-center">
                <SearchBar nfts={unlockedNfts} />
              </div>
              <h1 className="md:text-4xl text-white font-bold">
                Unlocked Nfts
              </h1>
              {error && error !== "" ? (
                <p className="text-xl font-medium text-red-400">
                  Error: {error}
                </p>
              ) : (
                ""
              )}
              {/* <p>{selectedNftMint?.toBase58()}</p> */}
              {/* <button onClick={fetchAllNfts}>fetch nfts</button> */}
              <div className="flex flex-wrap">
                {unlockedNfts.length !== 0 ? (
                  unlockedNfts.map((nft) => {
                    return (
                      <NftItem
                        key={nft.mint.toBase58()}
                        mint={nft.mint}
                        image={nft.image}
                        name={nft.name}
                      />
                    );
                  })
                ) : (
                  <h1 className="text-white font-medium mt-3">
                    No unlocked nfts found in wallet
                  </h1>
                )}
              </div>
              <button onClick={unlock}>unlock(dev)</button>
              {selectedNftMint !== undefined ? (
                <div className="fixed shadow-lg bottom-0 right-0 m-12 bg-dashboardSidebar p-5 font-medium rounded-md">
                  <button onClick={lockNft} className="text-white mb-1">
                    Lock Selected NFT
                  </button>
                  <hr />
                  <button
                    onClick={() => setSelectedNftMint(undefined)}
                    className="text-red-200 mt-1"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            <h1 className="text-2xl m-6 text-white font-medium">
              Please connect wallet
            </h1>
          )}
        </div>
      </SelectedNftContext.Provider>
    </MainContainer>
  );
};

export default Dashboard;
