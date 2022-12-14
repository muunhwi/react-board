import { BrowserRouter, Route, Routes } from "react-router-dom";
import BoardList from "./boardList/BoardList";
import Board from "./editor/Board";
import BoardDetail from "./editor/BoardDetail";
import BoardUpdate from "./editor/BoardUpdate";
import ErrorPage from "./Error/ErrorPage";
import Main from "./main/Main";
import MyPage from "./mypage/MyPage";
import { Nav } from "./nav";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-gray-200 ">
        <Nav />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route
            path="/write/"
            element={
              sessionStorage.getItem("refresh_token") !== null ? (
                <Board />
              ) : (
                <ErrorPage />
              )
            }
          ></Route>
          <Route
            path="/update/:id"
            element={
              sessionStorage.getItem("refresh_token") !== null ? (
                <BoardUpdate />
              ) : (
                <ErrorPage />
              )
            }
          ></Route>
          <Route path="/board/:id" element={<BoardDetail />}></Route>
          <Route path="/list/:category" element={<BoardList />}></Route>
          <Route
            path="/mypage"
            element={
              sessionStorage.getItem("refresh_token") !== null ? (
                <MyPage />
              ) : (
                <ErrorPage />
              )
            }
          ></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
