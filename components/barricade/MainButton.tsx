import Link from "next/link";

type MainButtonType = {
  text: string;
  href: string;
};

const MainButton = ({ text, href }: MainButtonType) => {
  return (
    <div className="sm:m-10 m-5">
      {/* <Link href={link}> */}
      <a href={href}>
        <button className="font-medium bg-buttonBackground hover:bg-buttonBackgroundAlt text-main w-[150px] h-[35px] border border-main rounded-2xl transition">
          {text}
        </button>
      </a>
      {/* </Link> */}
    </div>
  );
};

export default MainButton;
