const BoardBtn = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="border w-32 rounded-full bg-violet-600 p-2 text-white flex justify-center items-center gap-3 "
    >
      {children}
    </button>
  );
};

export default BoardBtn;
