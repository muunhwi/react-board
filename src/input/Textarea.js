import { forwardRef } from "react";

const Textarea = forwardRef(({ onChange, onClick, value }, ref) => {
  return (
    <div className="flex flex-col items-end mt-3">
      <textarea
        ref={ref}
        style={{ height: "5rem", resize: "none" }}
        className="w-full outline-none border"
        onChange={onChange}
        value={value}
      ></textarea>
      <button
        onClick={onClick}
        className="border w-16 rounded-full bg-violet-600 p-2 text-white flex justify-center items-center gap-3 mt-3 "
      >
        <span>등록</span>
      </button>
    </div>
  );
});

export default Textarea;
