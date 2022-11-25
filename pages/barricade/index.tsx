import MainContainer from "../../components/MainContainer";
import { barricadeTitle, prefix } from "../../utils/barricade-js/constants";
import BarricadeLogo from "../../public/barricade-logo.png";
import Image from "next/image";
import BackgroundSphere from "../../components/barricade/BackgroundSphere";
import MainButton from "../../components/barricade/MainButton";
import Link from "next/link";

const Barricade = () => {
  return (
    <div>
      <BackgroundSphere className="bottom-36" />
      <BackgroundSphere className="top-26 right-20 scale-50" />
      <div className="sm:block hidden">
        <BackgroundSphere className="bottom-5 right-20 scale-75" />
      </div>
      <div className="lg:block hidden">
        <BackgroundSphere className="top-5 left-[700px] scale-200" />
      </div>
      <MainContainer
        title={barricadeTitle}
        className="justify-center items-center flex min-h-screen"
      >
        <div className="bg-gradient-to-r">
          <div className="justify-center flex">
            <Image
              src={BarricadeLogo}
              width={300}
              height={300}
              alt="barricade-logo"
              priority
            />
          </div>
          <h1 className="text-center sm:text-7xl text-4xl font-bold text-main">
            Barricade
          </h1>
          <div className="flex justify-center items-center flex-wrap m-5">
            <MainButton text="About" link={`${prefix}/about`} />
            <MainButton text="FAQ" link={`${prefix}/faq`} />
            <MainButton text="Dashboard" link={`${prefix}/dashboard`} />
          </div>
        </div>
      </MainContainer>
    </div>
  );
};

export default Barricade;
