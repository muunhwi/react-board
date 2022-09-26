import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MainBackground from "../main/MainBackground";
import { BiSearch } from "react-icons/bi";
import Page from "../paging/Page";
import SearchModal from "./SearchModal";

const searchInput = {
  id: "search",
  type: "text",
  placeholder: "검색",
  label: "",
};
const inputType = [
  {
    name: "search",
    valid: false,
    message: "값을 입력해주세요",
  },
  {
    name: "select",
    valid: false,
    message: "값을 입력해주세요",
  },
];

const selectList = [
  {
    id: 1,
    menu: "제목",
  },
  {
    id: 2,
    menu: "닉네임",
  },
  {
    id: 3,
    menu: "컨탠츠",
  },
  {
    id: 4,
    menu: "제목/컨텐츠",
  },
];

const BoardList = () => {
  const { category } = useParams();
  const [page, setPage] = useState(null);
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const index = useRef(0);

  const boardListInfo = useCallback(
    async (data) => {
      if (data === undefined) {
        data = { contents: null, type: null };
      }
      const res = await axios({
        method: "post",
        url: `/board/list/${category}?page=${index.current}`,
        data: data,
      });
      setPage(res.data);
      setList(res.data.content);
    },
    [category]
  );

  useEffect(() => {
    boardListInfo();
  }, [boardListInfo]);

  const ModalBtnOnClick = (e) => {
    setOpen(!open);
  };

  return (
    <>
      <MainBackground
        modal={
          <SearchModal
            boardListInfo={boardListInfo}
            open={open}
            setOpen={setOpen}
            ModalBtnOnClick={ModalBtnOnClick}
          />
        }
      >
        <div>
          <div className="h-48"></div>
          <div className="text-xl font-medium">{list[0]?.categoryName}</div>
          <div>
            <button className="text-xl mt-3" onClick={ModalBtnOnClick}>
              <BiSearch />
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-t border-b">
                <th className="w-8/12 p-2">제목</th>
                <th className="w-40">글쓴이</th>
                <th>추천수</th>
                <th>날짜</th>
              </tr>
            </thead>
            <tbody className="truncate ...">
              {list
                ?.filter((c) => c.isDeleted === false)
                .map((c) => {
                  return (
                    <tr key={c.boardId} className="border-b hover:bg-gray-100">
                      <td className="w-8/12 indent-1  p-1">
                        <Link to={`/board/${c.boardId}`}>{c.title}</Link>
                      </td>
                      <td className="w-40">{c.nickname}</td>
                      <td className="text-center text-blue-600">
                        {c.commentCount}
                      </td>
                      <td className="text-center text-gray-400">
                        {c.hoursAgo}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="mt-5">
            <Page page={page} index={index} fetch={boardListInfo} />
          </div>
        </div>
      </MainBackground>
    </>
  );
};

export default BoardList;
