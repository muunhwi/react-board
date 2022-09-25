import axios from "axios";
import { useState } from "react";
import { TextField } from "../input/TextField";
import Validation from "../input/Validation";
import { Modal } from "../modal/Modal";

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

const nicknameInput = {
  id: "nickname",
  type: "nickname",
  placeholder: "닉네임을 입력해주세요",
  label: "닉네임",
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
  {
    name: "nickname",
    valid: false,
    message: "닉네임을 입력해주세요",
  },
];
const SignUp = ({ open, signUpOpenClick, loginOpenClick }) => {
  const [validationArr, setArr] = useState(inputType);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [globalError, setGlobalError] = useState("");

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

  const handleOnNickname = (e) => {
    setNickname(e.target.value);
    fieldChangeValidation("nickname", e.target.value, ["required"]);
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
          url: "/signup",

          data: {
            email: email,
            password: password,
            nickname: nickname,
          },
        });
        signUpOpenClick();
        setGlobalError("");
        alert("회원가입 완료!");
        loginOpenClick();
      }
    } catch (e) {
      console.log(e.response.data);
      const message = e.response.data.message;
      if (message === "email") {
        setGlobalError("이메일");
      } else if (message === "nickname") {
        setGlobalError("닉네임");
      }
    }
  };

  const getValidation = (name) => {
    return validationArr?.filter((arr) => arr.name === name)[0];
  };
  return (
    <div>
      <Modal
        title={"회원가입"}
        open={open}
        onClick={signUpOpenClick}
        onSubmit={handleOnSubmit}
      >
        {globalError !== "" ? (
          <p className={"mt-2 text-sm text-red-600 "}>
            중복된 {globalError} 입니다.
          </p>
        ) : null}
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
        <TextField
          input={nicknameInput}
          onChange={handleOnNickname}
          validation={getValidation("nickname")}
        />
      </Modal>
    </div>
  );
};

export default SignUp;
