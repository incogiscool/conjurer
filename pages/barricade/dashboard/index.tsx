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

const Dashboard = () => {
  const [unlockedNfts, setUnlockedNfts] = useState<NFTDataType[]>([]);
  const [lockedNfts, setLockedNfts] = useState<NFTDataType[]>([]);

  const [activeTabState, setActiveTabState] =
    useState<ActiveTabTypes>("unlocked");
  // const [activeTab, setActiveTab] = useState<JSX.Element>();

  const [selectedNftMint, setSelectedNftMint] = useState<PublicKey | undefined>(
    undefined
  );

  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

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

      const res = await barricade.fetchAllNFTs();

      const unlockedNfts = res.filter((nft) => nft.isFrozen === false);
      const lockedNfts = res.filter((nft) => nft.isFrozen === true);

      //add condition where if no nfts in wallet put msg on screen
      //add toast for errors instead of useState and for successes
      //add toast fr loading and success
      //fix margins on dashboard

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
    if (loading && loading !== "") {
      toast.loading(loading, toastSettings);
      setLoading("");
    }
  }, [loading]);

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

      setLoading("Locking Nft... Please accept both transaction pop-ups.");

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

  function UnlockedTab() {
    return (
      <div className="m-16 w-screen">
        <div className="flex justify-center">
          <SearchBar nfts={unlockedNfts} />
        </div>
        <h1 className="md:text-4xl text-white font-bold">Unlocked Nfts</h1>
        <p>active tab: {activeTabState}</p>
        {/* {error && error !== "" ? (
        <p className="text-xl font-medium text-red-400">
          Error: {error}
        </p>
      ) : (
        ""
      )} */}
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
    );
  }

  function LockedTab() {
    return (
      <div>
        <div>
          <h1>Locked Tab</h1>
        </div>
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
          <div className="flex">
            <DashboardSidebar />
            {wallet.connected ? (
              <UnlockedTab />
            ) : (
              <h1 className="text-2xl m-6 text-white font-medium">
                Please connect wallet
              </h1>
            )}
          </div>
        </DashboardTabChangeContext.Provider>
      </SelectedNftContext.Provider>
    </MainContainer>
  );
};

export default Dashboard;
