import { useCallback, useEffect, useMemo, useState } from "react";
import "quill/dist/quill.snow.css";
import axios from "axios";
import "./style.css";
import { useQuill } from "react-quilljs";

export const Editor = ({ onChange, validation, value }) => {
  const [flag, setFlag] = useState(true);
  const { quill, quillRef } = useQuill(
    useMemo(() => {
      return {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            [{ size: ["small", false, "large", "huge"] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ align: [] }],
            ["link", "image"],
            ["clean"],
          ],
        },
      };
    }, [])
  );

  const insertToEditor = useCallback(
    (url) => {
      const range = quill.getSelection();
      quill.insertEmbed(range.index, "image", url);
      quill.setSelection(range.index + 1, 2);
    },
    [quill]
  );

  const saveToServer = useCallback(
    async (file) => {
      const body = new FormData();
      body.append("file", file);

      const res = await axios({
        method: "post",
        url: "/board/image",
        data: body,
      });
      insertToEditor(res.data.location);
    },
    [insertToEditor]
  );

  const selectLocalImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      saveToServer(file);
    };
  }, [saveToServer]);

  useEffect(() => {
    if (quill) {
      if (value && flag) {
        quill.root.innerHTML = value;
        setFlag(false);
      }
      quill.on("text-change", (delta, oldDelta, source) => {
        onChange(quill.root.innerHTML);
      });
      quill.getModule("toolbar").addHandler("image", selectLocalImage);
    }
  }, [quill, flag, value, selectLocalImage, onChange]);

  return (
    <div className="w-full md:w-3/4 z-10">
      <div>
        <div ref={quillRef} />
        <p className={"mt-2 text-sm text-red-600 "}>
          {validation?.isSubmit ? validation?.message : ""}
        </p>
      </div>
    </div>
  );
};
