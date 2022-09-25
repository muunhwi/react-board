import { useMemo } from "react";
import { subInitialMenu } from "../Constants";
import { useMountTransition } from "../hooks/useMountTransition";
import { Link } from "react-router-dom";

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
                <Link to={`/list/${sub.id}`}>{sub.menu}</Link>
              </li>
            ))}
        </ul>
      ),
    [menu, isActive, tran]
  );
};
