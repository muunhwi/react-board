import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainBackground from "../main/MainBackground";

const ErrorPage = () => {
  const [status, setStatus] = useState(404);

  const errorInfo = useCallback(async () => {
    try {
      if (window.location.pathname === "/write") {
        await axios({
          method: "get",
          url: `${window.location.pathname}`,
        });
      }
    } catch (e) {
      setStatus(e.response.status);
    }
  }, []);

  useEffect(() => {
    errorInfo();
  }, [errorInfo]);

  const getMessage = () => {
    if (status === 401) {
      return (
        <div className="font-bold">
          {" "}
          <span>죄송합니다.</span> 권한이 존재하지 않습니다.
        </div>
      );
    } else if (status === 404) {
      return (
        <div className="font-bold">
          {" "}
          <span>죄송합니다.</span> 요청이 잘못 되었습니다.
        </div>
      );
    }
  };

  return (
    <MainBackground>
      <div>
        <div className="flex h-screen justify-center items-center text-center">
          <div>
            <div className="text-8xl">{status}</div>
            {getMessage()}
            <div className="mt-5">
              <Link
                to={"/"}
                className="g-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              >
                홈으로
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainBackground>
  );
};

export default ErrorPage;
