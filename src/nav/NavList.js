import { useMemo } from "react";
import { initialMenu } from "../Constants";
import { SubNavList } from "./SubNavList";

export const NavList = () => {
  return useMemo(
    () => (
      <ul className="hidden xl:flex flex-nowrap flex-gap gap-x-4 text-white items-center">
        {initialMenu.map((m) => (
          <li className="group relative h-20 flex items-center" key={m.id}>
            {m.menu}
            <SubNavList menu={m} />
          </li>
        ))}
      </ul>
    ),
    []
  );
};
