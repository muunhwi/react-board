import { useMemo } from "react";
import { useMountTransition } from "../hooks/useMountTransition";

const subInitialMenu = [
  { id: 1, parentId: 1, menu: "인증 게시글" },
  { id: 2, parentId: 1, menu: "인기 게시글" },
  { id: 3, parentId: 2, menu: "미인증 게시글" },
  { id: 4, parentId: 2, menu: "미인증 인기 게시글" },
  { id: 5, parentId: 2, menu: "붐업 베스트" },
  { id: 6, parentId: 3, menu: "읽을 거리 판" },
  { id: 7, parentId: 3, menu: "인기 게시글" },
  { id: 8, parentId: 4, menu: "컴퓨터 / IT 판" },
  { id: 9, parentId: 4, menu: "창작 판" },
];

export const SideNavSubList = ({ menu, sideNav }) => {
  const isActive = sideNav.some((nav) => nav.id === menu.id);
  const tran = useMountTransition(isActive, 300);

  return useMemo(
    () =>
      (isActive || tran) && (
        <ul
          className={`${
            isActive === true && tran === true
              ? "animate-fadeIn "
              : "animate-fadeOut"
          }   mt-2 flex flex-col gap-y-2`}
        >
          {subInitialMenu
            .filter((sub) => menu.id === sub.parentId)
            .map((sub) => (
              <li
                className={`${
                  tran === true ? "visible" : "invisible"
                }   min-w-max`}
                key={sub.id}
              >
                {sub.menu}
              </li>
            ))}
        </ul>
      ),
    [menu, isActive, tran]
  );
};
