const LoginSmallBtn = ({ onClick, text }) => {
  return (
    <button
      className="w-16 h-8 shadow-sm  
          border-inherit rounded-lg text-white transition ease-in-out 
          bg-fuchsia-400 hover:-translate-y-1 hover:scale-105 hover:bg-fuchsia-400 duration-300"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default LoginSmallBtn;
