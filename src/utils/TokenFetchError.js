import axios from "axios";

const TokenFetchError = async (token, refreshToken, message) => {
  if (message === "expired") {
    try {
      const res = await axios.post("/token/expired", {
        token: token,
        refreshToken: refreshToken,
      });

      console.log(res.data);

      if (res.data) {
        sessionStorage.setItem("refresh_token", res.data.refreshToken);
        sessionStorage.setItem("access_token", res.data.accessToken);
        alert("등록버튼을 다시 눌러주세요!");
      }
    } catch (e) {
      sessionStorage.removeItem("refresh_token");
      sessionStorage.removeItem("access_token");
      alert("모든 세션이 만료되었습니다. 다시 로그인 해주세요");
      window.location.reload();
    }
  }
};

export default TokenFetchError;
