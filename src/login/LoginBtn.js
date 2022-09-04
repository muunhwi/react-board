import { useMemo } from "react";
import { TextField } from "../input/TextField";
import { Modal } from "../modal/Modal";
import { LoginBottom } from "./LoginBottom";

export const LoginBtn = ({ login, onClick }) => {
  return useMemo(
    () => (
      <div>
        <button
          className="w-16 h-8 shadow-sm  
          border-inherit rounded-lg text-white transition ease-in-out 
          bg-fuchsia-400 hover:-translate-y-1 hover:scale-105 hover:bg-fuchsia-400 duration-300"
          onClick={onClick}
        >
          로그인
        </button>
        <Modal
          title={"로그인"}
          open={login}
          onClick={onClick}
          bottomLink={<LoginBottom />}
        >
          <TextField />
          <TextField />
        </Modal>
      </div>
    ),
    [login, onClick]
  );
};
