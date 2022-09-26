import React, { useCallback, useEffect, useMemo, useState } from "react";
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
          <div className="flex items-center bg-purple-500 h-24 justify-evenly shadow-md">
            <div className="min-h-min p-2">
              <span className="flex min-w-min text-3xl text-white">
                SideBar
              </span>
            </div>
          </div>
          <SideNavList />
        </div>
      </div>
    );
  }, [bar, isFirst, onClick]);
};
