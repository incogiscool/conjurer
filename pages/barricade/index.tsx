import MainContainer from "../../components/MainContainer";
import { barricadeTitle, prefix } from "../../utils/barricade-js/constants";
import BarricadeLogo from "../../public/barricade-logo.png";
import Image from "next/image";
import BackgroundSphere from "../../components/barricade/BackgroundSphere";
import MainButton from "../../components/barricade/MainButton";
import Link from "next/link";
import Cards from "../../components/barricade/Cards";
import ShowoffDesktopImage from "../../public/barricade-show-landing-desktop.png";
import ShowoffMobileImage from "../../public/barricade-showoff-mobile.png";
import AccordionComponent from "../../components/barricade/AccordionComponent";

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
        <main>
          <section className="justify-center items-center flex min-h-screen">
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
                <MainButton text="About" href={`${prefix}#about`} />
                <MainButton text="FAQ" href={`${prefix}#faq`} />
                <MainButton text="Dashboard" href={`${prefix}/dashboard`} />
              </div>
            </div>
          </section>
          <section className="text-center justify-center grid" id="about">
            <h1 className="text-6xl font-medium text-main">
              What is Barricade?
            </h1>
            <p className="text-white font-medium m-4 max-w-6xl justify-center">
              The way Barricade allows you to secure your assets is by freezing
              them in your wallet, this way no one could move your tokens even
              if they get access to your wallet. The one and only way your NFTs
              could be unlocked is through your permission from Barricade, which
              only you have the control over. This is by far the most safe way
              to safely store your valuables, and we do it here through
              Barricade.
            </p>
            <div className="flex flex-wrap justify-center m-16">
              <Image
                src={ShowoffDesktopImage}
                alt="showoff-desktop-image"
                width={750}
                height={425}
                className="m-3"
              />
              <Image
                src={ShowoffMobileImage}
                alt="showoff-desktop-image"
                width={300}
                height={600}
                className="m-3"
              />
            </div>
            <div>
              <h4 className="text-4xl font-medium text-main m-4">
                Why Barricade?
              </h4>
              <div className="flex flex-wrap justify-center">
                <Cards
                  header="Secure"
                  text="A new way to secure your NFTs and SPL tokens. Introducing Barricade, the first ever security tool to safely store your assets through a vault supported by the community."
                />
                <Cards
                  header="Affordable"
                  text="Our main priority is to guard the NFT space from malicious intents, all while providing an affordable service to be fair with everyone."
                />
              </div>
            </div>
          </section>
          <section className="m-16" id="faq">
            <h1 className="text-6xl font-medium text-main text-center">FAQ</h1>
            <main className="m-6 justify-center">
              <AccordionComponent
                header="What exactly is Barricade?"
                text="Barricade is a Conjurer-powered security tool. You can use Barricade to secure any of your Token or NFTs while maintaining the complete ownership of your assets as they're stored in your default wallet."
                // className="text-white bg-buttonBackgroundAlt/50"
              />
              <AccordionComponent
                header="Why would I use Barricade?"
                text="Barricade is primarily a digital ledger that is more secure than your traditional physical ledger, once your NFT is locked, even you will not be able to move it unless you unlock it through barricade. This secures all your assets and prevents them from being drained by malicious links, fake mint sites, exploitive extensions or any unauthorized access."
                // className="text-white bg-buttonBackgroundAlt/50"
              />
              <AccordionComponent
                header="How much do you charge?"
                text="There is a very minimal fee against per NFT you lock with the Barricade vault, each time you lock your NFT you will only be charged once."
                // className="text-white bg-buttonBackgroundAlt/50"
              />
              <AccordionComponent
                header="What does Barricade mean to Conjurer?"
                text="One of the many tools created by Conjurer is Barricade. Conjurer is a group of builders that specialize in developing tools, addressing and resolving difficulties in the NFT space, and working on building additional revenue for holders."
                // className="text-white bg-buttonBackgroundAlt/50"
              />
            </main>
          </section>
        </main>
      </MainContainer>
    </div>
  );
};

export default Barricade;
