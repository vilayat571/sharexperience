import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules, formats } from "../../../quillConfig";

const Richtext: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const quillRef = useRef<ReactQuill>(null);

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <h2>Rich Text Editor with Code Block</h2>

      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        formats={formats}
        placeholder="Write something amazing..."
        style={{ height: "300px", marginBottom: "1rem" }}
      />

      {/* HTML Preview */}
      <div>
        <h3>HTML Preview</h3>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            minHeight: "100px",
          }}
          dangerouslySetInnerHTML={{ __html: value }}
        />
      </div>
    </div>
  );
};

export default Richtext;
