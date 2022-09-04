import { useMemo } from "react";

export const LoginBottom = () => {
  return useMemo(
    () => (
      <div className="mt-3 flex flex-col text-center">
        <span className="text-gray-500">아직 회원이 아닌신가요?</span>
        <span className="text-violet-700">회원가입 하러가기</span>
      </div>
    ),
    []
  );
};
