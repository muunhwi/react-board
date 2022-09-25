import React, { useCallback, useMemo } from "react";
import { SideLoginBtn } from "../login/SideLoginBtn";
import { SideNavList } from "./SideNavList";

export const SideNav = ({ bar, isFirst, onClick, onLoginClick }) => {
  const handleLoginOnClick = useCallback(() => {
    onClick();
    onLoginClick();
  }, [onClick, onLoginClick]);

  return useMemo(() => {
    return (
      <div className={isFirst ? "hidden" : "block"}>
        <div
          className={`${
            bar ? "animate-fadeIn3 " : "animate-fadeOut3 "
          } min-w-full h-full bg-black  absolute top-0 z-20`}
          onClick={onClick}
        ></div>
        <div
          className={`${
            bar ? "animate-move " : "animate-revMove "
          } bg-white h-full shadow-xl w-80  absolute top-0 z-30`}
        >
          <SideLoginBtn onClick={handleLoginOnClick} />
          <SideNavList />
        </div>
      </div>
    );
  }, [bar, isFirst, onClick, handleLoginOnClick]);
};
