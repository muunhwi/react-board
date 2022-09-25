import { useCallback, useMemo, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { initialMenu } from "../Constants";
import { SideNavSubList } from "./SideNavSubList";

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
      <ul className="p-3 mt-3  flex flex-col gap-y-5 ">
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
