import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import MainBackground from "../main/MainBackground";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import Page from "../paging/Page";

const MyPage = () => {
  const [page, setPage] = useState(null);
  const [list, setList] = useState([]);
  const [isBoardActive, setBoardActive] = useState(false);
  const [isCommentActive, setCommentActive] = useState(false);
  const boardIndex = useRef(0);
  const commentIndex = useRef(0);

  const boardListInfo = useCallback(async () => {
    const token = sessionStorage.getItem("access_token");
    if (token == null) {
      alert("세션이 만료되었습니다.");
      return;
    }
    try {
      const res = await axios({
        method: "get",
        url: `/board/mypage?page=${boardIndex.current}`,
        headers: {
          Authorization: "Bearer " + token,
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      setPage(res.data);
      setList(res.data.content);
      setBoardActive(true);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const commentListInfo = useCallback(async () => {
    const token = sessionStorage.getItem("access_token");
    if (token == null) {
      alert("세션이 만료되었습니다.");
      return;
    }
    try {
      const res = await axios({
        method: "get",
        url: `/comment/mypage?page=${commentIndex.current}`,
        headers: {
          Authorization: "Bearer " + token,
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      console.log(res.data);
      setPage(res.data);
      setList(res.data.content);
      setCommentActive(true);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const boardSearchOnClick = useCallback(() => {
    setCommentActive(false);
    boardListInfo();
  }, [boardListInfo]);

  const commentSearchOnClick = useCallback(() => {
    setBoardActive(false);
    commentListInfo();
  }, [commentListInfo]);

  const boardDeleteOnClick = async (e, id) => {
    const token = sessionStorage.getItem("access_token");
    if (token == null) {
      alert("세션이 만료되었습니다.");
      return;
    }
    const res = await axios({
      method: "get",
      url: `/board/delete/${id}`,
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    boardListInfo();
  };

  return (
    <MainBackground>
      <div className="flex flex-col h-80 justify-center items-center">
        <div className="text-4xl mb-5">
          {list[0] !== undefined ? list[0]?.nickname : "고객"}님 반갑습니다.
        </div>
        <div className="flex gap-x-5">
          <button
            onClick={boardSearchOnClick}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            작성글 조회
          </button>
          <button
            onClick={commentSearchOnClick}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            작성댓글 조회
          </button>
        </div>
      </div>
      {isBoardActive === true && (
        <div>
          <div className="text-xl font-medium">작성한 게시글</div>
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
                      <td>
                        <Link to={`/update/${c.boardId}`}>수정</Link>
                      </td>
                      <td>
                        <button
                          onClick={(e) => boardDeleteOnClick(e, c.boardId)}
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="mt-5">
            <Page page={page} index={boardIndex} fetch={boardListInfo} />
          </div>
        </div>
      )}
      {isCommentActive === true && (
        <div>
          <div className="text-xl font-medium">작성한 댓글</div>
          <table className="w-full">
            <thead>
              <tr className="border-t border-b">
                <th className="w-8/12 p-2">내용</th>
                <th>날짜</th>
              </tr>
            </thead>
            <tbody className="truncate ...">
              {list
                ?.filter((c) => c.isDeleted === false)
                .map((c) => {
                  return (
                    <tr key={c.id} className="border-b hover:bg-gray-100">
                      <td className="w-8/12 indent-1  p-1">
                        <Link to={`/board/${c.boardId}`}>{c.contents}</Link>
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
            <Page page={page} index={commentIndex} fetch={commentListInfo} />
          </div>
        </div>
      )}
    </MainBackground>
  );
};

export default MyPage;
