// src/components/Richtext.tsx
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill styles

// Define modules and formats outside the component
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold", "italic", "underline", "strike",
  "list", "bullet",
  "link", "image",
];

const QuillEditor: React.FC = () => {
  const [value, setValue] = useState<string>("");

  return (
    <div>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}   // Use the imported constants
        formats={formats}
        placeholder="Start typing..."
      />
      <div style={{ marginTop: "1rem" }}>
        <strong>Content:</strong>
        <div>{value}</div>
      </div>
    </div>
  );
};

export default QuillEditor;
