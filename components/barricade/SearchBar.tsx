import { useEffect, useState } from "react";
import { NFTDataType } from "../../utils/barricade-js/types";

type SearchBarType = {
  nfts: NFTDataType[];
};

const SearchBar = ({ nfts }: SearchBarType) => {
  const [inputQuery, setInputQuery] = useState<string>("");

  function formSubmitHandler(e: any) {
    e.preventDefault();
    if (!nfts || nfts.length === 0) return;
    if (inputQuery === "") return;

    console.log("Form Submitted");
    console.log(inputQuery);

    let matchQuery = [];

    for (let i = 0; i < nfts.length; i++) {
      if (nfts[i].name.toLowerCase().includes(inputQuery)) {
        matchQuery.push(nfts[i]);
      }
    }

    console.log(matchQuery);
  }

  useEffect(() => {
    if (inputQuery === "") {
      console.log("query cleared");
    }
  }, [inputQuery]);

  return (
    <div className="">
      <form
        className="flex shadow-xl border border-slate-300 bg-[#3e678c]/[.5] pl-4 pr-4 p-2 rounded-2xl justify-between sm:w-[450px]"
        onSubmit={formSubmitHandler}
      >
        <input
          placeholder="Search Nfts..."
          className="text-white bg-transparent aria-disabled w-full text-lg placeholder:text-white border-none outline-none"
          onChange={(e) => setInputQuery(e.target.value)}
        />
        <svg
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
          className="invert scale-125 ml-2 cursor-pointer"
          onClick={formSubmitHandler}
        >
          <path d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z" />
        </svg>
      </form>
    </div>
  );
};

export default SearchBar;
