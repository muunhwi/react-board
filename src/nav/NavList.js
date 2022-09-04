import { useMemo } from "react";
import { SubNavList } from "./SubNavList";

const initialMenu = [
  { id: 1, menu: "인증된 게시글" },
  { id: 2, menu: "미인증 게시글" },
  { id: 3, menu: "읽을 거리 게시판" },
  { id: 4, menu: "커뮤니티" },
];

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
