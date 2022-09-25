import { useMemo } from "react";
import { Link } from "react-router-dom";
import { subInitialMenu } from "../Constants";

export const SubNavList = ({ menu }) => {
  return useMemo(
    () => (
      <ul className="transition ease-in-out delay-100 bg-white invisible group-hover:visible group-hover:scale-105  absolute border text-black top-[75px] p-5 shadow-md">
        {subInitialMenu
          .filter((sub) => menu.id === sub.parentId)
          .map((sub) => (
            <li className="min-w-max" key={sub.id}>
              <Link to={`/list/${sub.id}`}>{sub.menu}</Link>
            </li>
          ))}
      </ul>
    ),
    [menu]
  );
};
