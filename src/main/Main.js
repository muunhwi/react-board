import { subInitialMenu } from "../Constants";
import MainBackground from "./MainBackground";
import MainSection from "./MainSection";

const Main = () => {
  return (
    <MainBackground>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 z-10">
        {subInitialMenu.map((item) => (
          <MainSection item={item} key={item.id} />
        ))}
      </div>
    </MainBackground>
  );
};

export default Main;
