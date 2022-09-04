import { useMemo } from "react";
import { RiMenu2Line } from "react-icons/ri";

const logo = "인기글 커뮤니티";

export const Logo = ({ onClick }) => {
  return useMemo(() => {
    return (
      <div className="inline-block text-2xl text-white flex gap-x-4">
        <button
          onClick={onClick}
          className="transition ease-in-out  bg-fuchsia-400 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
        >
          <RiMenu2Line />
        </button>
        {logo}
      </div>
    );
  }, [onClick]);
};
