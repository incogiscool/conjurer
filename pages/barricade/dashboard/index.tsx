import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
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
import { DashboardTabChangeContext } from "../../../contexts/DashboardTabChangeContext";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RenderNftsContext } from "../../../contexts/RenderNftsContext";
import BackgroundSphere from "../../../components/barricade/BackgroundSphere";

const Dashboard = () => {
  const [unlockedNfts, setUnlockedNfts] = useState<NFTDataType[]>([]);
  const [lockedNfts, setLockedNfts] = useState<NFTDataType[]>([]);
  const [renderNfts, setRenderNfts] = useState<NFTDataType[]>([]);

  const [activeTabState, setActiveTabState] =
    useState<ActiveTabTypes>("unlocked");
  // const [activeTab, setActiveTab] = useState<JSX.Element>();

  const [selectedNftMint, setSelectedNftMint] = useState<PublicKey | undefined>(
    undefined
  );

  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const wallet = useWallet();
  const connection = new Connection(connectionCluster);
  let barricade = new Barricade(wallet, wallet.publicKey, connection);

  const toastSettings: ToastOptions<{}> = {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  async function fetchAllNfts() {
    try {
      if (!wallet.connected) return;

      setInfo("Loading NFTs");

      const res = await barricade.fetchAllNFTs();

      const unlockedNfts = res.filter((nft) => nft.isFrozen === false);
      const lockedNfts = res.filter((nft) => nft.isFrozen === true);

      setUnlockedNfts(unlockedNfts);
      setLockedNfts(lockedNfts);
    } catch (err: any) {
      console.log(err);
      setError(err.message);
    }
  }

  useEffect(() => {
    if (error && error !== "") {
      toast.error(error, toastSettings);
      setError("");
    }
  }, [error]);

  useEffect(() => {
    if (info && info !== "") {
      toast.info(info, toastSettings);
      setInfo("");
    }
  }, [info]);

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

  useEffect(() => {
    if (activeTabState === "unlocked") {
      setRenderNfts(unlockedNfts);
    } else if (activeTabState === "locked") {
      setRenderNfts(lockedNfts);
    } else {
      setError("Render NFTs error...");
    }
  }, [activeTabState, unlockedNfts, lockedNfts]);

  async function lockNft() {
    try {
      if (!selectedNftMint || selectedNftMint === undefined) {
        throw new Error("Please select an NFT.");
      }

      if (activeTabState !== "unlocked") return;

      setInfo("Locking NFT ( Accept both transactions).");

      const res = await barricade.lockNFT(selectedNftMint);
      console.log(res);

      location.reload();
    } catch (err: any) {
      console.log(err);
      setError(err.message);
    }
  }

  async function unlockNft() {
    try {
      if (!selectedNftMint || selectedNftMint === undefined) {
        throw new Error("Please select an NFT.");
      }

      if (activeTabState !== "locked") return;

      setInfo("Unlocking NFT (Accept Transaction).");

      const res = await barricade.unlockNFT(lockedNfts[0].mint);
      console.log(res);

      location.reload();
    } catch (err: any) {
      console.log(err);
      setError(err.message);
    }
  }

  function UnlockedTab() {
    return (
      <div className="m-16">
        <div className="flex">
          <SearchBar nfts={unlockedNfts} />
        </div>
        <h1 className="md:text-4xl text-white font-bold">Unlocked NFTs</h1>
        {/* <p>active tab: {activeTabState}</p> */}
        {/* {error && error !== "" ? (
        <p className="text-xl font-medium text-red-400">
          Error: {error}
        </p>
      ) : (
        ""
      )} */}
        {/* <p>{selectedNftMint?.toBase58()}</p> */}
        {/* <button onClick={fetchAllNfts}>fetch nfts</button> */}
        <div className="flex flex-wrap">
          {renderNfts.length !== 0 ? (
            renderNfts.map((nft) => {
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
            <h1 className="text-white font-medium mt-3">No NFTs Found</h1>
          )}
        </div>
        {/* <button onClick={unlockNft}>unlock(dev)</button> */}
        {selectedNftMint !== undefined ? (
          <div className="fixed shadow-lg bottom-0 right-0 m-12 bg-dashboardSidebar p-3 font-medium rounded-md">
            <button
              onClick={lockNft}
              className="text-white mb-1 hover:text-slate-300 transition"
            >
              Lock Selected NFT
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }

  function LockedTab() {
    return (
      <div className="m-16">
        <div className="flex">
          <SearchBar nfts={lockedNfts} />
        </div>
        <h1 className="md:text-4xl text-white font-bold">Locked NFTs</h1>
        <div className="flex flex-wrap">
          {renderNfts.length !== 0 ? (
            renderNfts.map((nft) => {
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
            <h1 className="text-white font-medium mt-3">No NFTs Found</h1>
          )}
        </div>
        {selectedNftMint !== undefined ? (
          <div className="fixed shadow-lg bottom-0 right-0 m-12 bg-dashboardSidebar p-3 font-medium rounded-md">
            <button
              onClick={unlockNft}
              className="text-white mb-1 hover:text-slate-300 transition"
            >
              Unlock Selected NFT
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }

  function ProfileTab() {
    return (
      <div>
        <div>
          <h1>Profile Tab</h1>
        </div>
      </div>
    );
  }

  // useEffect(() => {
  //   if (activeTabState === "unlocked") {
  //     setActiveTab(<UnlockedTab />);
  //   } else if (activeTabState === "locked") {
  //     setActiveTab(<LockedTab />);
  //   } else if (activeTabState === "profile") {
  //     setActiveTab(<ProfileTab />);
  //   } else {
  //     setError("Tab mismatch. Please reload.");
  //   }
  // }, [activeTabState]);

  return (
    <MainContainer title={barricadeTitle} className="min-h-screen">
      <SelectedNftContext.Provider
        //@ts-ignore
        value={{ selectedNftMint, setSelectedNftMint }}
      >
        <DashboardTabChangeContext.Provider
          //@ts-ignore
          value={{ activeTabState, setActiveTabState }}
        >
          <RenderNftsContext.Provider
            //@ts-ignore
            value={{ renderNfts, setRenderNfts }}
          >
            <BackgroundSphere className="bottom-4 right-48" />
            <BackgroundSphere className="top-36 left-58" />
            <BackgroundSphere className="top-4 right-16 scale-50" />
            <ToastContainer
              position="bottom-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
            <div className="flex">
              <DashboardSidebar />
              {wallet.connected ? (
                <div className="">
                  {activeTabState === "locked" ? (
                    <LockedTab />
                  ) : (
                    <div className="">
                      {activeTabState === "profile" ? (
                        <ProfileTab />
                      ) : (
                        <div className="">
                          {activeTabState === "unlocked" ? <UnlockedTab /> : ""}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <h1 className="text-2xl m-6 text-white font-medium">
                  Please connect wallet
                </h1>
              )}
            </div>
          </RenderNftsContext.Provider>
        </DashboardTabChangeContext.Provider>
      </SelectedNftContext.Provider>
    </MainContainer>
  );
};

export default Dashboard;
