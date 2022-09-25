import axios from "axios";
import TokenFetchError from "./TokenFetchError";

const TokenFetchPost = async (url, data, Fun) => {
  const token = sessionStorage.getItem("access_token");
  const refreshToken = sessionStorage.getItem("refresh_token");

  if (token === null || refreshToken === null) {
    alert("로그인 해주세요");
    return;
  }

  try {
    const res = await axios.post(url, data, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (Fun || res?.data) {
      Fun(res.data);
    }

    alert("등록되었습니다.");
  } catch (e) {
    console.log(e);
    TokenFetchError(token, refreshToken, e.response.data.error);
  }
};

export default TokenFetchPost;
