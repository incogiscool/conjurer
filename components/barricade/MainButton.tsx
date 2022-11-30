import Link from "next/link";

type MainButtonType = {
  text: string;
  link: string;
};

const MainButton = ({ text, link }: MainButtonType) => {
  return (
    <div className="sm:m-10 m-5">
      <Link href={link}>
        <button className="font-medium bg-buttonBackground hover:bg-buttonBackgroundAlt text-main w-[150px] h-[35px] border border-main rounded-2xl transition">
          {text}
        </button>
      </Link>
    </div>
  );
};

export default MainButton;
