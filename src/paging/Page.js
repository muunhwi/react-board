import { PageBtnClass } from "../Constants";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";
import { useCallback } from "react";

const Page = ({ page, index, fetch }) => {
  const pageBtnClick = useCallback(
    (e, number) => {
      index.current = number - 1;
      fetch();
    },
    [fetch, index]
  );

  const getPages = useCallback(() => {
    const arr = [];
    const totalPages = page?.totalPages;
    let start = Math.floor(page?.number / 10) * 10 + 1;
    let last = start + 9 < totalPages ? start + 9 : totalPages;

    if (start === undefined || isNaN(start)) start = 1;
    if (last === undefined || isNaN(start)) last = 1;
    for (let i = start; i <= last; i++) {
      arr.push(
        <button
          onClick={(e) => pageBtnClick(e, i)}
          key={i}
          className={PageBtnClass}
        >
          {i}
        </button>
      );
    }
    return arr;
  }, [page, pageBtnClick]);

  return (
    <div className="flex justify-center items-center">
      <div className="flex gap-x-3">
        <button
          onClick={(e) => pageBtnClick(e, index.current)}
          className={PageBtnClass}
          disabled={page?.first === true}
        >
          <HiArrowSmLeft />
        </button>
        <div className="flex items-center">
          <div className="flex gap-x-3">{getPages()}</div>
        </div>
        <button
          onClick={(e) => pageBtnClick(e, index.current + 2)}
          className={PageBtnClass}
          disabled={page?.last === true}
        >
          <HiArrowSmRight />
        </button>
      </div>
    </div>
  );
};

export default Page;
