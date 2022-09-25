import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { LoginBtn } from "../login/LoginBtn";
import { Logo } from "../logo";
import { SideNav } from "../side/SideNav";
import { NavList } from "./NavList";

export const Nav = () => {
  const [sideBar, setBar] = useState("");
  const [loginModal, setLoginModal] = useState(false);
  const [isFirst, setFirst] = useState(true);

  const handleSideBarOnClick = useCallback(() => {
    if (isFirst) setFirst(false);
    setBar(!sideBar);
  }, [sideBar, isFirst]);

  const handleLoginOnClick = useCallback(() => {
    setLoginModal(!loginModal);
  }, [loginModal]);

  return useMemo(
    () => (
      <div className="h-16 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-sm">
        <div className="h-full container mx-auto flex justify-between p-3 xl:justify-evenly items-center">
          <Logo onClick={handleSideBarOnClick} />
          <NavList />
          <LoginBtn loginModal={loginModal} onClick={handleLoginOnClick} />
        </div>
        <SideNav
          bar={sideBar}
          isFirst={isFirst}
          setFirst={setFirst}
          setBar={setBar}
          onClick={handleSideBarOnClick}
          onLoginClick={handleLoginOnClick}
        />
      </div>
    ),
    [sideBar, loginModal, isFirst, handleSideBarOnClick, handleLoginOnClick]
  );
};
