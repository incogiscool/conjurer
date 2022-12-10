import Head from "next/head";
import { ReactElement, useState } from "react";

type MainContainerTypes = {
  children: ReactElement;
  title: string;
  className?: string;
};

const MainContainer = ({ children, title, className }: MainContainerTypes) => {
  const [supported, setSupported] = useState(true);

  useState(() => {
    if (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    ) {
      setSupported(false);
    }
  }, []);

  return (
    <div className={className}>
      <Head>
        <title>{title}</title>
      </Head>
      {supported ? <div>{children}</div> : <div>device not supported</div>}
    </div>
  );
};

export default MainContainer;
