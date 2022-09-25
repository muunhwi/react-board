import Textarea from "../input/Textarea";

const ReplyInput = ({
  id,
  commentActive,
  handleOnChangeReply,
  handleOnReply,
}) => {
  return (
    <div
      className={
        commentActive?.id === id && commentActive?.isActive === true
          ? "block mb-2"
          : "hidden"
      }
    >
      <Textarea
        onChange={handleOnChangeReply}
        onClick={(e) => handleOnReply(e, id)}
      />
    </div>
  );
};

export default ReplyInput;
