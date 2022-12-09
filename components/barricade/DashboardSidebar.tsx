import WalletMultiButtonDynamic from "../WalletMultiButtonDynamic";
import BarricadeLogo from "../../public/barricade-logo.png";
import Image from "next/image";
import Link from "next/link";
import {
  barricadeVersion,
  connectionCluster,
  prefix,
} from "../../utils/barricade-js/constants";
import { useWallet } from "@solana/wallet-adapter-react";
import { useContext, useEffect, useState } from "react";
import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Barricade } from "../../utils/barricade-js";
import { DashboardTabChangeContext } from "../../contexts/DashboardTabChangeContext";
import { ActiveTabTypes } from "../../utils/barricade-js/types";
import { SelectedNftContext } from "../../contexts/SelectedNftContext";

const DashboardSidebar = () => {
  const [walletBalanceSolRounded, setWalletBalanceSolRounded] =
    useState<number>(0);
  const connection = new Connection(connectionCluster);
  const wallet = useWallet();

  const barricade = new Barricade(wallet, wallet.publicKey, connection);

  //@ts-ignore
  const { setActiveTabState } = useContext(DashboardTabChangeContext);
  //@ts-ignore
  const { setSelectedNftMint } = useContext(SelectedNftContext);

  function changeActiveTabs(tab: ActiveTabTypes) {
    setSelectedNftMint(undefined);
    setActiveTabState(tab);
  }

  async function getWalletBalanceSol() {
    try {
      if (!wallet.connected) return;
      const res = await barricade.getWalletBalance();
      const walletBalanceSol = res.basisPoints.toNumber() / LAMPORTS_PER_SOL;
      const rounded = Math.ceil(walletBalanceSol * 100) / 100;

      setWalletBalanceSolRounded(rounded);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (wallet.connected) {
      getWalletBalanceSol();
    } else {
      setWalletBalanceSolRounded(0);
      return;
    }
  });

  return (
    <div className="bg-dashboardSidebar flex flex-col md:w-[300px] h-screen items-center justify-center">
      <div className="flex justify-center">
        <Link href={prefix}>
          <Image
            src={BarricadeLogo}
            alt="barricade-logo"
            width={100}
            height={100}
            priority
          />
        </Link>
      </div>
      <div className="grid justify-center">
        <WalletMultiButtonDynamic />
        <hr className="mt-5" />
      </div>
      <div className="flex flex-col justify-between h-full">
        <div className="ml-6">
          <div
            className="flex items-center m-4 mt-16 cursor-default"
            // title="Coming soon..."
            id="profile-dashboard"
            // onClick={() => changeActiveTabs("profile")}
          >
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
              className="invert scale-[2]"
            >
              <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm8.127 19.41c-.282-.401-.772-.654-1.624-.85-3.848-.906-4.097-1.501-4.352-2.059-.259-.565-.19-1.23.205-1.977 1.726-3.257 2.09-6.024 1.027-7.79-.674-1.119-1.875-1.734-3.383-1.734-1.521 0-2.732.626-3.409 1.763-1.066 1.789-.693 4.544 1.049 7.757.402.742.476 1.406.22 1.974-.265.586-.611 1.19-4.365 2.066-.852.196-1.342.449-1.623.848 2.012 2.207 4.91 3.592 8.128 3.592s6.115-1.385 8.127-3.59zm.65-.782c1.395-1.844 2.223-4.14 2.223-6.628 0-6.071-4.929-11-11-11s-11 4.929-11 11c0 2.487.827 4.783 2.222 6.626.409-.452 1.049-.81 2.049-1.041 2.025-.462 3.376-.836 3.678-1.502.122-.272.061-.628-.188-1.087-1.917-3.535-2.282-6.641-1.03-8.745.853-1.431 2.408-2.251 4.269-2.251 1.845 0 3.391.808 4.24 2.218 1.251 2.079.896 5.195-1 8.774-.245.463-.304.821-.179 1.094.305.668 1.644 1.038 3.667 1.499 1 .23 1.64.59 2.049 1.043z" />
            </svg>
            <p className="text-white ml-6 font-medium text-lg">Profile</p>
            <div className="profile-dashboard-tooltip">
              <p>tooltip</p>
            </div>
          </div>
          <div
            className="flex items-center m-4 mt-16 cursor-pointer"
            onClick={() => changeActiveTabs("unlocked")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="invert scale-[2]"
            >
              <path d="M8 10v-4c0-2.206 1.795-4 4-4s4 1.794 4 4v1h2v-1c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-13zm11 12h-14v-10h14v10z" />
            </svg>
            <p className="text-white ml-6 font-medium text-lg">Unlocked</p>
          </div>
          <div
            className="flex items-center m-4 mt-16 cursor-pointer"
            onClick={() => changeActiveTabs("locked")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="invert scale-[2]"
            >
              <path d="M6 8v-2c0-3.313 2.686-6 6-6 3.312 0 6 2.687 6 6v2h-2v-2c0-2.206-1.795-4-4-4s-4 1.794-4 4v2h-2zm15 2v14h-18v-14h18zm-2 2h-14v10h14v-10z" />
            </svg>
            <p className="text-white ml-6 font-medium text-lg">Locked</p>
          </div>
        </div>
        <div className="justify-center mb-2">
          <div className="m-8 shadow-lg border border-nftItemBackground bg-buttonBackgroundAlt p-2 rounded-xl">
            <div className="flex items-center justify-center">
              <div className="scale-75">
                <svg
                  width="36"
                  height="28"
                  viewBox="0 0 36 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 18L2 10H26L34 18M26 10L34 2H10L2 10M2 26H26L34 18H10L2 26Z"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="ml-4 text-lg text-white font-medium">
                {walletBalanceSolRounded}
              </p>
            </div>
          </div>
          <p className="flex justify-center text-center text-buttonBackgroundAlt">
            {barricadeVersion}
          </p>
        </div>
        {/* <button onClick={getWalletBalanceSol}>get balance</button> */}
      </div>
    </div>
  );
};

export default DashboardSidebar;
