import Head from "next/head";
import { ReactElement } from "react";

type MainContainerTypes = {
  children: ReactElement;
  title: string;
  className?: string;
};

const MainContainer = ({ children, title, className }: MainContainerTypes) => {
  return (
    <div className={className}>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </div>
  );
};

export default MainContainer;
