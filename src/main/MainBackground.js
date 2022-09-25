const MainBackground = ({ children, modal }) => {
  return (
    <div id="id" className="flex  justify-center">
      <div className="bg-white min-h-screen container xl:w-[1248px] p-3 ">
        {children}
        {modal}
      </div>
    </div>
  );
};

export default MainBackground;
