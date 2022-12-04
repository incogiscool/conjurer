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
                <MainButton text="About" link={`${prefix}#about`} />
                <MainButton text="FAQ" link={`${prefix}#faq`} />
                <MainButton text="Dashboard" link={`${prefix}/dashboard`} />
              </div>
            </div>
          </section>
          <section className="text-center" id="about">
            <h1 className="text-6xl font-medium text-main">
              What is Barricade?
            </h1>
            <p className="m-12 text-white max-w-6xl font-medium">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              turpis enim, malesuada vel euismod eget, efficitur vitae lacus.
              Phasellus sagittis velit ipsum, quis lobortis libero aliquet ac.
              Praesent varius, justo ac suscipit sollicitudin, nisi magna auctor
              neque, eu rhoncus ipsum magna quis lacus. Donec non risus metus.
              Maecenas pretium dolor at velit mollis, vestibulum finibus felis
              viverra. Suspendisse id ipsum nisl. Maecenas molestie viverra ante
              vitae facilisis. Mauris sed vehicula arcu.
            </p>
            <div className="flex flex-wrap justify-center m-16">
              <Image
                src={ShowoffDesktopImage}
                alt="showoff-desktop-image"
                width={550}
                height={350}
                className="m-3"
              />
              <Image
                src={ShowoffMobileImage}
                alt="showoff-desktop-image"
                width={200}
                height={500}
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
                  text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla turpis enim, malesuada vel euismod eget, efficitur vitae lacus. Phasellus sagittis velit ipsum, quis lobortis libero aliquet ac."
                />
                <Cards
                  header="Affordable"
                  text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla turpis enim, malesuada vel euismod eget, efficitur vitae lacus. Phasellus sagittis velit ipsum, quis lobortis libero aliquet ac."
                />
              </div>
            </div>
          </section>
          <section className="text-center m-16" id="faq">
            <h1 className="text-6xl font-medium text-main">FAQ</h1>
            <main className="m-6 justify-center">
              <AccordionComponent
                header="What exactly is Barricade?"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla turpis enim, malesuada vel euismod eget, efficitur vitae lacus. Phasellus sagittis velit ipsum, quis lobortis libero aliquet ac. Praesent varius, justo ac suscipit sollicitudin, nisi magna auctor neque, eu rhoncus ipsum magna quis lacus. Donec non risus metus. Maecenas pretium dolor at velit mollis, vestibulum finibus felis viverra. Suspendisse id ipsum nisl. Maecenas molestie viverra ante vitae facilisis. Mauris sed vehicula arcu."
                className="text-white bg-buttonBackgroundAlt/50"
              />
              <AccordionComponent
                header="Why would I use Barricade?"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla turpis enim, malesuada vel euismod eget, efficitur vitae lacus. Phasellus sagittis velit ipsum, quis lobortis libero aliquet ac. Praesent varius, justo ac suscipit sollicitudin, nisi magna auctor neque, eu rhoncus ipsum magna quis lacus. Donec non risus metus. Maecenas pretium dolor at velit mollis, vestibulum finibus felis viverra. Suspendisse id ipsum nisl. Maecenas molestie viverra ante vitae facilisis. Mauris sed vehicula arcu."
                className="text-white bg-buttonBackgroundAlt/50"
              />
              <AccordionComponent
                header="How much do you charge?"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla turpis enim, malesuada vel euismod eget, efficitur vitae lacus. Phasellus sagittis velit ipsum, quis lobortis libero aliquet ac. Praesent varius, justo ac suscipit sollicitudin, nisi magna auctor neque, eu rhoncus ipsum magna quis lacus. Donec non risus metus. Maecenas pretium dolor at velit mollis, vestibulum finibus felis viverra. Suspendisse id ipsum nisl. Maecenas molestie viverra ante vitae facilisis. Mauris sed vehicula arcu."
                className="text-white bg-buttonBackgroundAlt/50"
              />
              <AccordionComponent
                header="What does Barricade mean to Conjurer?"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla turpis enim, malesuada vel euismod eget, efficitur vitae lacus. Phasellus sagittis velit ipsum, quis lobortis libero aliquet ac. Praesent varius, justo ac suscipit sollicitudin, nisi magna auctor neque, eu rhoncus ipsum magna quis lacus. Donec non risus metus. Maecenas pretium dolor at velit mollis, vestibulum finibus felis viverra. Suspendisse id ipsum nisl. Maecenas molestie viverra ante vitae facilisis. Mauris sed vehicula arcu."
                className="text-white bg-buttonBackgroundAlt/50"
              />
            </main>
          </section>
        </main>
      </MainContainer>
    </div>
  );
};

export default Barricade;
