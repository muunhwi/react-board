import { BiX } from "react-icons/bi";
import { useMountTransition } from "../hooks/useMountTransition";

export const Modal = ({
  children,
  onClick,
  onSubmit,
  open,
  bottomLink,
  title,
}) => {
  const tran = useMountTransition(open, 500);
  return (
    (tran || open) && (
      <div
        className={`${
          tran === true && open === true ? "animate-fadeIn" : "animate-fadeOut "
        } absolute min-w-full h-full top-0 left-0 z-30`}
      >
        <div
          className={`${
            tran ? "block" : "hidden"
          } min-w-full min-h-full flex justify-center items-center`}
        >
          <div
            className="min-w-full min-h-full bg-black absolute top-0 opacity-[0.3]"
            style={{ height: document.body.scrollHeight + "px" }}
            onClick={onClick}
          />
          <div className="fixed border bg-white w-[450px] shadow-lg z-50">
            <div className="border-b-2 w-full h-12 flex justify-between p-3">
              <span className="text-xl">{title}</span>
              <button className="text-3xl" onClick={onClick}>
                <BiX />
              </button>
            </div>
            <div className="flex flex-col items-center p-5">
              {children}
              <button
                type="submit"
                className="mt-7 text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-blue-300
                 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
                onClick={onSubmit}
              >
                Submit
              </button>
              {bottomLink}
            </div>
          </div>
        </div>
      </div>
    )
  );
};
