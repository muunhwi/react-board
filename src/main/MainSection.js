import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const MainSection = ({ item }) => {
  const [list, setList] = useState([]);

  const listInfo = useCallback(async () => {
    const res = await axios({
      method: "get",
      url: `/board/grid/${item.id}`,
    });
    setList(res.data);
  }, [item]);

  useEffect(() => {
    listInfo();
  }, [listInfo]);

  return (
    <div className="border mt-3 p-5">
      <div className="border-b">
        <span className="border-b-2 border-indigo-300 text-xl pb-1">
          <Link to={`/list/${item.id}`}>{item.menu}</Link>
        </span>
        <ul className="mt-3">
          {list
            ?.filter((c) => c.isDeleted === false)
            .map((c) => (
              <li className="p-1 h-8 border-b truncate ..." key={c.boardId}>
                <Link to={`/board/${c.boardId}`}>
                  {c.title}
                  <span className="text-violet-600 ml-8">{c.commentCount}</span>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default MainSection;
