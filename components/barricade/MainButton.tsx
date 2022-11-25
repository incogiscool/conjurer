import Link from "next/link";

type MainButtonType = {
  text: string;
  link: string;
};

const MainButton = ({ text, link }: MainButtonType) => {
  return (
    <Link href={link}>
      <button className="sm:m-10 m-5 font-medium bg-buttonBackground hover:bg-buttonBackgroundAlt text-main w-[150px] h-[35px] border border-main rounded-2xl transition">
        {text}
      </button>
    </Link>
  );
};

export default MainButton;
