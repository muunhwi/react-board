import { useEffect, useState } from "react";

export const useMountTransition = (isActive, delay) => {
  const [tran, setTran] = useState(false);

  useEffect(() => {
    let timeId;

    if (isActive && !tran) {
      setTran(true);
    } else if (!isActive && tran) {
      timeId = setTimeout(() => setTran(false), delay);
    }

    return () => clearTimeout(timeId);
  }, [tran, isActive, delay]);

  return tran;
};
