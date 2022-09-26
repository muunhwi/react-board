import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from ".";
import { selectMenu } from "../Constants";
import Select from "../input/Select";
import SubmitBtn from "../input/SubmitBtn";
import { TextField } from "../input/TextField";
import Validation from "../input/Validation";
import TokenFetchPost from "../utils/TokenFetchPost";

const inputType = [
  {
    name: "title",
    valid: true,
    message: "값을 입력해주세요",
  },
  {
    name: "contents",
    valid: true,
    message: "값을 입력해주세요",
  },
  {
    name: "select",
    valid: true,
    message: "값을 입력해주세요",
  },
];

const TitleInput = {
  id: "title",
  type: "text",
  placeholder: "제목을 입력해주세요",
  label: "",
};

const BoardUpdate = () => {
  const navi = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [validationArr, setArr] = useState(inputType);

  const boardInfo = useCallback(async () => {
    const res = await axios({
      method: "get",
      url: `/board/${id}`,
    });
    const data = res.data;
    setTitle(data.title);
    setContents(data.contents);
    setSelectValue(data.category);
  }, [id]);

  useEffect(() => {
    boardInfo();
  }, [boardInfo]);

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
        "/board/update",
        {
          boardId: id,
          title: title,
          contents: contents,
          category: selectValue,
        },
        () => navi(`/board/${id}`)
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
              value={title}
            />
            <Select
              onChange={handleOnSelectChange}
              validation={getValidation("select")}
              title="카테고리를 입력해주세요"
              list={selectMenu}
              value={selectValue}
            />
          </div>
          <Editor
            onChange={handleOnContentsChange}
            validation={getValidation("contents")}
            value={contents}
          />
          <div className="w-32">
            <SubmitBtn />
          </div>
        </form>
      </div>
    </div>
  );
};

export default BoardUpdate;
