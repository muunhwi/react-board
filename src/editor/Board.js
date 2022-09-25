import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from ".";
import { selectMenu } from "../Constants";
import Select from "../input/Select";
import SubmitBtn from "../input/SubmitBtn";
import { TextField } from "../input/TextField";
import Validation from "../input/Validation";
import TokenFetchPost from "../utils/TokenFetchPost";

const TitleInput = {
  id: "title",
  type: "text",
  placeholder: "제목을 입력해주세요",
  label: "",
};

const inputType = [
  {
    name: "title",
    valid: false,
    message: "값을 입력해주세요",
  },
  {
    name: "contents",
    valid: false,
    message: "값을 입력해주세요",
  },
  {
    name: "select",
    valid: false,
    message: "값을 입력해주세요",
  },
];

const Board = () => {
  const navi = useNavigate();
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [validationArr, setArr] = useState(inputType);

  const fieldChangeValidation = (name, value, type) => {
    const newValid = Validation(name, value, type);
    const newArr = validationArr.filter((arr) => arr.name !== newValid.name);
    setArr([...newArr, newValid]);
  };

  const handleOnTitleChange = (e) => {
    setTitle(e.target.value);
    fieldChangeValidation("title", e.target.value, ["required"]);
  };

  const handleOnContentsChange = (value) => {
    setContents(value);
    fieldChangeValidation("contents", value, ["contentsRequired"]);
  };

  const handleOnSelectChange = (e) => {
    setSelectValue(e.target.value);
    fieldChangeValidation("select", e.target.value, ["required"]);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const newArr = validationArr.map((arr) => {
      return { ...arr, isSubmit: true };
    });
    const inValid = validationArr.filter((arr) => arr.valid === false);

    if (inValid.length > 0) {
      setArr(newArr);
    } else {
      TokenFetchPost(
        "/board/save",
        {
          title: title,
          contents: contents,
          category: selectValue,
        },
        (variable) => navi(`/board/${variable}`)
      );
    }
  };

  const getValidation = (name) => {
    return validationArr?.filter((arr) => arr.name === name)[0];
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-center items-center bg-white min-h-screen container xl:w-[1248px] p-3 ">
        <form
          className="w-full flex flex-col justify-center items-center"
          onSubmit={handleOnSubmit}
        >
          <div className="w-full md:w-3/4 mb-3">
            <TextField
              onChange={handleOnTitleChange}
              input={TitleInput}
              validation={getValidation("title")}
            />
            <Select
              onChange={handleOnSelectChange}
              validation={getValidation("select")}
              title="카테고리를 입력해주세요"
              list={selectMenu}
            />
          </div>
          <Editor
            onChange={handleOnContentsChange}
            validation={getValidation("contents")}
          />
          <div className="w-32">
            <SubmitBtn />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Board;
