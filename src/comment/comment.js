import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { MdThumbUpOffAlt, MdThumbDownOffAlt } from "react-icons/md";
import Textarea from "../input/Textarea";
import TokenFetchPost from "../utils/TokenFetchPost";
import Reply from "./Reply";
import ReplyInput from "./ReplyInput";
import Page from "../paging/Page";

const Comment = ({ boardId }) => {
  const [page, setPage] = useState(null);
  const [commentArr, setCommentArr] = useState([]);
  const [comment, setComment] = useState("");
  const [reply, setReply] = useState("");
  const [commentActive, setCommentActive] = useState({});
  const index = useRef(0);

  const commentInfo = useCallback(async () => {
    const res = await axios.get(`/comment/${boardId}?page=${index.current}`);
    if (res.data) {
      setPage(res.data);
      setCommentArr([...res.data.content]);
    }
  }, [boardId]);

  useEffect(() => {
    commentInfo();
  }, [commentInfo]);

  const handleOnCommentActive = (id) => {
    if (commentActive?.id === id && commentActive?.isActive === true) {
      setCommentActive({ id: id, isActive: false });
    } else {
      console.log(commentActive);
      setCommentActive({ id: id, isActive: true });
    }
  };

  const handleOnChangeComment = (e) => {
    setComment(e.target.value);
  };

  const handleOnComment = (e) => {
    e.preventDefault();
    TokenFetchPost(`/comment/${boardId}`, comment, commentInfo);
    setComment("");
  };

  const handleOnChangeReply = (e) => {
    setReply(e.target.value);
  };

  const handleOnReply = (e, replyId) => {
    e.preventDefault();
    TokenFetchPost(`/reply/${boardId}/${replyId}`, reply, commentInfo);
    setCommentActive({ id: replyId, isActive: false });
    setReply("");
  };

  const handleOnRecommended = (e, commentId, isRecommended) => {
    TokenFetchPost(
      `/comment/recommended/${commentId}`,
      isRecommended,
      commentInfo
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold p-3">{page?.totalElements}개의 댓글</h2>
      {commentArr?.length > 0 && (
        <ul>
          {commentArr
            .filter((c) => c.step === 0)
            .map((c) => (
              <li key={c.id}>
                <div className="flex justify-between bg-violet-200 p-3 border-b">
                  <span>{c.name}</span>
                  <span>{c.hoursAgo}</span>
                </div>
                <div className="p-2">{c.contents}</div>
                <div className="flex flex-col justify-end ">
                  <div className="flex items-center justify-end p-2 gap-2 h-2 mb-2">
                    <button
                      onClick={(e) =>
                        handleOnRecommended(e, c.id, { isRecommended: true })
                      }
                    >
                      <MdThumbUpOffAlt />
                    </button>
                    <span className="">{c.recommended}</span>
                    <button
                      onClick={(e) =>
                        handleOnRecommended(e, c.id, { isRecommended: false })
                      }
                    >
                      <MdThumbDownOffAlt />
                    </button>
                    <button
                      onClick={() => handleOnCommentActive(c.id)}
                      className="px-2"
                    >
                      댓글 달기
                    </button>
                  </div>
                  <ReplyInput
                    id={c.id}
                    commentActive={commentActive}
                    handleOnReply={handleOnReply}
                    handleOnChangeReply={handleOnChangeReply}
                  />
                </div>
                <Reply
                  parent={c}
                  commentArr={commentArr}
                  commentActive={commentActive}
                  handleOnReply={handleOnReply}
                  handleOnChangeReply={handleOnChangeReply}
                  handleOnCommentActive={handleOnCommentActive}
                  handleOnRecommended={handleOnRecommended}
                />
              </li>
            ))}
        </ul>
      )}
      <Page page={page} index={index} fetch={commentInfo} />
      <Textarea
        onChange={handleOnChangeComment}
        onClick={handleOnComment}
        value={comment}
      ></Textarea>
    </div>
  );
};

export default Comment;
