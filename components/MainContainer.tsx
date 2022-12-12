import Head from "next/head";
import { ReactElement, useEffect, useState } from "react";

type MainContainerTypes = {
  children: ReactElement;
  title: string;
  className?: string;
};

const MainContainer = ({ children, title, className }: MainContainerTypes) => {
  const [onMobile, setOnMobile] = useState(true);

  let isOnMobile;

  useEffect(() => {
    isOnMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isOnMobile) {
      setOnMobile(true);
    } else setOnMobile(false);
  }, [isOnMobile]);

  return (
    <div className={className}>
      <Head>
        <title>{title}</title>
      </Head>
      {onMobile ? (
        <div className="flex justify-center text-white font-bold text-3xl">
          Device not supported
        </div>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
};

export default MainContainer;
