import dynamic from "next/dynamic";
import { useState } from "react";

const QuillNoSSRWraper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>loading...</p>,
});

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    // ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  // "image",
  // "video",
];

const TextAreaEditor = ({ OnUpdate }: any) => {
  const [value, setValue] = useState("");
  const handleChange = (content: any) => {
    setValue(content);
    OnUpdate(content);
    // console.log(content);
  };

  return (
    <QuillNoSSRWraper
      modules={modules}
      formats={formats}
      value={value}
      onChange={handleChange}
      theme="snow"
      style={{ height: "100px" }}
    />
  );
};

export default TextAreaEditor;
