import { MdThumbUpOffAlt, MdThumbDownOffAlt } from "react-icons/md";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainBackground from "../main/MainBackground";
import BoardBtn from "../input/BoardBtn";
import Comment from "../comment/comment";
import axios from "axios";
import TokenFetchPost from "../utils/TokenFetchPost";

const BoardDetail = () => {
  const { id } = useParams();
  const [board, setBoard] = useState({});

  const boardInfo = useCallback(async () => {
    const res = await axios({
      method: "get",
      url: `/board/${id}`,
    });
    setBoard(res.data);
  }, [id]);

  useEffect(() => {
    boardInfo();
  }, [boardInfo]);

  const handleOnRecommended = (e, boardId, isRecommended) => {
    TokenFetchPost(`/board/recommended/${boardId}`, isRecommended, boardInfo);
  };

  return (
    <MainBackground>
      <div className="h-48"></div>
      <div className="flex justify-between p-3 font-bold text-xl border-b-4 border-violet-500">
        <span>{board?.title}</span>
        <span>{board?.categoryName}</span>
      </div>
      <div className="p-3 bg-purple-100 font-bold">
        {board?.member?.nickname}
      </div>
      <div
        className="p-3 mt-5 mb-7 "
        dangerouslySetInnerHTML={{ __html: board?.contents }}
      />
      <div className="h-36 flex justify-center items-center border-b mb-10 ">
        <div className="flex justify-center gap-5">
          <BoardBtn
            onClick={(e) => handleOnRecommended(e, id, { isRecommended: true })}
          >
            <MdThumbUpOffAlt />
            <span>
              베스트!{`  ${board.recommended ? board.recommended : 0}`}
            </span>
          </BoardBtn>
          <BoardBtn
            onClick={(e) =>
              handleOnRecommended(e, id, { isRecommended: false })
            }
          >
            <MdThumbDownOffAlt />
            <span>
              붐업ㅜ {`  ${board.notRecommended ? board.notRecommended : 0}`}
            </span>
          </BoardBtn>
        </div>
      </div>
      <div className="border-b p-1">
        <Comment boardId={id} />
      </div>
    </MainBackground>
  );
};

export default BoardDetail;
