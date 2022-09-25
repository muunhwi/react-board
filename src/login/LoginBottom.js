import { useMemo } from "react";

export const LoginBottom = ({ loginOpen, loginOpenClick, signUpOpenClick }) => {
  const signUpModalOpen = () => {
    if (loginOpen) {
      loginOpenClick();
    }
    signUpOpenClick();
  };

  return useMemo(
    () => (
      <div className="mt-3 flex flex-col text-center">
        <span className="text-gray-500">아직 회원이 아닌신가요?</span>
        <button onClick={signUpModalOpen} className="text-violet-700">
          회원가입 하러가기
        </button>
      </div>
    ),
    []
  );
};
