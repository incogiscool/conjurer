// import Link from "next/link";
import { Link } from "react-scroll";

type MainButtonType = {
  text: string;
  href: string;
};

const MainButton = ({ text, href }: MainButtonType) => {
  return (
    <div className="sm:m-10 m-5">
      {/* <Link href={link}> */}
      <Link
        to={href}
        spy={true}
        smooth={true}
        offset={-50}
        duration={800}
        href={href}
      >
        <button className="font-medium bg-buttonBackground hover:bg-buttonBackgroundAlt text-main w-[150px] h-[35px] border border-main rounded-2xl transition">
          {text}
        </button>
      </Link>
      {/* </Link> */}
    </div>
  );
};

export default MainButton;
