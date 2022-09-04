import { useMemo } from "react";
import { BiChevronRight } from "react-icons/bi";

export const SideLoginBtn = ({ onClick }) => {
  return useMemo(
    () => (
      <div className="flex items-center bg-purple-500 h-24 justify-evenly shadow-md">
        <img className="w-12 h-12" alt="img" src="img/profile_default.png" />
        <div className="min-h-min p-2">
          <span className="flex flex-col  min-w-min text-xl text-white">
            로그인 및 회원가입
          </span>
          <span className="text-slate-100">회원가입하세요!</span>
        </div>
        <button className="text-4xl text-white" type="button" onClick={onClick}>
          <BiChevronRight />
        </button>
      </div>
    ),
    [onClick]
  );
};
