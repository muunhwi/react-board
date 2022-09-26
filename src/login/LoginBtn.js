import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoginSmallBtn from "../input/LoginSmallBtn";
import { TextField } from "../input/TextField";
import Validation from "../input/Validation";
import { Modal } from "../modal/Modal";
import SignUp from "../signup/SignUp";
import { LoginBottom } from "./LoginBottom";

const emailInput = {
  id: "email",
  type: "email",
  placeholder: "이메일을 입력해주세요",
  label: "이메일",
};

const passwordInput = {
  id: "password",
  type: "password",
  placeholder: "비밀번호를 입력해주세요",
  label: "비밀번호",
};

const inputType = [
  {
    name: "email",
    valid: false,
    message: "이메일을 입력해주세요",
  },
  {
    name: "password",
    valid: false,
    message: "비밀번호를 입력해주세요",
  },
];
export const LoginBtn = ({ loginModal, onClick }) => {
  const [validationArr, setArr] = useState(inputType);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpOpen, setsignUpOpen] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const [token, setToken] = useState(false);

  const isLogin = async (token) => {
    try {
      const res = await axios.post("/token/expired", {
        refreshToken: token,
      });
      if (res.data) {
        setToken(true);
      }
    } catch (e) {
      setToken(false);
    }
  };

  useEffect(() => {
    const refresh_token = sessionStorage.getItem("refresh_token");
    if (refresh_token) {
      isLogin(refresh_token);
    } else {
      setToken(false);
    }
  }, [token]);

  const signUpOpenClick = () => {
    setGlobalError("");
    setsignUpOpen(!signUpOpen);
  };

  const fieldChangeValidation = (name, value, type) => {
    const newValid = Validation(name, value, type);
    const newArr = validationArr.filter((arr) => arr.name !== newValid.name);
    setArr([...newArr, newValid]);
  };

  const handleOnEmailChange = (e) => {
    setEmail(e.target.value);
    fieldChangeValidation("email", e.target.value, ["required", "email"]);
  };

  const handleOnPassword = (e) => {
    setPassword(e.target.value);
    fieldChangeValidation("password", e.target.value, ["required", "password"]);
  };

  const handleOnSubmit = async (e) => {
    const newArr = validationArr.map((arr) => {
      return { ...arr, isSubmit: true };
    });
    const inValid = validationArr.filter((arr) => arr.valid === false);
    try {
      if (inValid.length > 0) {
        setArr(newArr);
      } else {
        const res = await axios({
          method: "post",
          url: "/login",

          data: {
            email: email,
            password: password,
          },
        });

        if (res.data) {
          sessionStorage.setItem("refresh_token", res.data.refreshToken);
          sessionStorage.setItem("access_token", res.data.accessToken);
          setToken(!token);
          setGlobalError("");
          onClick();
        }
      }
    } catch (e) {
      const message = e.response.data.message;
      if (message === "이메일") {
        setGlobalError("이메일 또는 비밀번호가 틀립니다.");
      }
    }
  };

  const handleOnLogout = () => {
    sessionStorage.removeItem("refresh_token");
    sessionStorage.removeItem("access_token");
    setToken(false);
  };

  const getValidation = (name) => {
    return validationArr?.filter((arr) => arr.name === name)[0];
  };

  return (
    <div>
      {token ? (
        <div className="flex gap-x-2">
          <LoginSmallBtn onClick={handleOnLogout} text={"Logout"} />
          <Link
            className="w-16 h-8 shadow-sm flex justify-center items-center
          border-inherit rounded-lg text-white transition ease-in-out 
          bg-fuchsia-400 hover:-translate-y-1 hover:scale-105 hover:bg-fuchsia-400 duration-300 block"
            to={"/write"}
          >
            write
          </Link>
          <Link
            className="w-16 h-8 shadow-sm flex justify-center items-center
          border-inherit rounded-lg text-white transition ease-in-out 
          bg-fuchsia-400 hover:-translate-y-1 hover:scale-105 hover:bg-fuchsia-400 duration-300 block"
            to={"/mypage"}
          >
            mypage
          </Link>
        </div>
      ) : (
        <LoginSmallBtn onClick={onClick} text={"Login"} />
      )}
      <Modal
        title={"로그인"}
        open={loginModal}
        onClick={onClick}
        onSubmit={handleOnSubmit}
        bottomLink={
          <LoginBottom
            loginOpen={loginModal}
            loginOpenClick={onClick}
            signUpOpenClick={signUpOpenClick}
          />
        }
      >
        <p className={"mt-2 text-sm text-red-600 "}>{globalError}</p>
        <TextField
          input={emailInput}
          onChange={handleOnEmailChange}
          validation={getValidation("email")}
        />
        <TextField
          input={passwordInput}
          onChange={handleOnPassword}
          validation={getValidation("password")}
        />
      </Modal>
      <SignUp
        open={signUpOpen}
        signUpOpenClick={signUpOpenClick}
        loginOpenClick={onClick}
      />
    </div>
  );
};
