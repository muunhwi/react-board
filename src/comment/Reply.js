import { MdThumbUpOffAlt, MdThumbDownOffAlt } from "react-icons/md";
import ReplyInput from "./ReplyInput";

const Reply = ({
  parent,
  commentArr,
  updateActive,
  commentActive,
  handleOnReply,
  handleOnUpdate,
  handleOnUpdateChange,
  handleOnChangeReply,
  handleOnCommentActive,
  handleOnRecommended,
  commentUpdateOnClick,
  commentDeleteOnClick,
  update,
  reply,
}) => {
  return (
    <ul className="ml-7">
      {commentArr
        .filter((r) => r.group === parent.group && r.step === 1)
        .map((r) => (
          <li id={r.id} key={r.id}>
            <div className="flex justify-between bg-violet-200 p-3 border-b">
              <span>{r.name}</span>
              <span>{r.hoursAgo}</span>
            </div>

            <div className="p-2 flex gap-x-5">
              <span className="bg-violet-50 font-white">@{r.parentName}</span>
              {r.contents}
            </div>

            <div className="flex flex-col justify-end ">
              <div className="flex items-center justify-end p-2 gap-2 h-2 mb-2 ">
                <button onClick={(e) => handleOnRecommended(e, r.id, true)}>
                  <MdThumbUpOffAlt />
                </button>
                <span className="">{r.recommended}</span>
                <button onClick={(e) => handleOnRecommended(e, r.id, false)}>
                  <MdThumbDownOffAlt />
                </button>
                <button
                  onClick={() => handleOnCommentActive(r.id)}
                  className="px-2"
                >
                  댓글 달기
                </button>
                <button
                  onClick={(e) => commentUpdateOnClick(e, r.id)}
                  className={
                    r.flag === true && r.isDeleted === false
                      ? "px-2 block"
                      : "hidden"
                  }
                >
                  수정
                </button>
                <button
                  onClick={(e) => commentDeleteOnClick(e, r.id)}
                  className={
                    r.flag === true && r.isDeleted === false
                      ? "px-2 block"
                      : "hidden"
                  }
                >
                  삭제
                </button>
              </div>
              <ReplyInput
                id={r.id}
                commentActive={commentActive}
                handleOnReply={handleOnReply}
                handleOnChangeReply={handleOnChangeReply}
                value={reply}
              />
              <ReplyInput
                id={r.id}
                commentActive={updateActive}
                handleOnReply={(e) => handleOnUpdate(e, r.id)}
                handleOnChangeReply={handleOnUpdateChange}
                value={update}
              />
            </div>
          </li>
        ))}
    </ul>
  );
};

export default Reply;
