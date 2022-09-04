import { useCallback, useMemo, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { SideNavSubList } from "./SideNavSubList";

const initialMenu = [
  { id: 1, menu: "인증된 게시글", isActive: false },
  { id: 2, menu: "미인증 게시글", isActive: false },
  { id: 3, menu: "읽을 거리 게시판", isActive: false },
  { id: 4, menu: "커뮤니티", isActive: false },
];

export const SideNavList = () => {
  const [sideNav, setSideNav] = useState([]);

  const handleOnClick = useCallback(
    (id) => {
      const isActive = sideNav.some((nav) => nav.id === id);
      if (isActive) {
        const newNav = sideNav.filter((nav) => nav.id !== id);
        setSideNav(newNav);
      } else {
        setSideNav([...sideNav, { id: id }]);
      }
    },
    [sideNav]
  );

  return useMemo(
    () => (
      <ul className="p-3 mt-3 min-h-screen flex flex-col gap-y-5 ">
        {initialMenu.map((m) => (
          <li key={m.id}>
            <div className="text-lg flex justify-between">
              <span>{m.menu}</span>
              <button className="text-2xl" onClick={() => handleOnClick(m.id)}>
                <FiChevronDown />
              </button>
            </div>
            <SideNavSubList menu={m} sideNav={sideNav} />
          </li>
        ))}
      </ul>
    ),
    [sideNav, handleOnClick]
  );
};
