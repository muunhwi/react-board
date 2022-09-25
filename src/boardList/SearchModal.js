import { useState } from "react";
import Select from "../input/Select";
import { TextField } from "../input/TextField";
import Validation from "../input/Validation";
import { Modal } from "../modal/Modal";

const inputType = [
  {
    name: "search",
    valid: false,
    message: "값을 입력해주세요",
  },
  {
    name: "select",
    valid: false,
    message: "값을 입력해주세요",
  },
];

const searchInput = {
  id: "search",
  type: "text",
  placeholder: "검색",
  label: "",
};

const selectList = [
  {
    id: 1,
    menu: "제목",
  },
  {
    id: 2,
    menu: "닉네임",
  },
  {
    id: 3,
    menu: "컨탠츠",
  },
  {
    id: 4,
    menu: "제목/컨텐츠",
  },
];

const SearchModal = ({ boardListInfo, open, setOpen, ModalBtnOnClick }) => {
  const [search, setSearch] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [validationArr, setArr] = useState(inputType);

  const fieldChangeValidation = (name, value, type) => {
    const newValid = Validation(name, value, type);
    const newArr = validationArr.filter((arr) => arr.name !== newValid.name);
    setArr([...newArr, newValid]);
  };

  const searchOnChange = (e) => {
    setSearch(e.target.value);
    fieldChangeValidation("search", e.target.value, ["required"]);
  };

  const selectOnChange = (e) => {
    setSelectValue(e.target.value);
    fieldChangeValidation("select", e.target.value, ["required"]);
  };

  const modalOnSubmit = (e) => {
    boardListInfo({
      type: selectValue,
      contents: search,
    });
    setOpen(!open);
  };

  const getValidation = (name) => {
    return validationArr?.filter((arr) => arr.name === name)[0];
  };

  return (
    <Modal
      open={open}
      title={"검색"}
      onClick={ModalBtnOnClick}
      onSubmit={modalOnSubmit}
    >
      <TextField
        input={searchInput}
        onChange={searchOnChange}
        validation={getValidation("search")}
      />
      <Select
        onChange={selectOnChange}
        title="검색 조건"
        validation={getValidation("select")}
        list={selectList}
      />
    </Modal>
  );
};

export default SearchModal;
