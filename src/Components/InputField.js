import React, { useState } from "react";
import "./InpuField.css";

function InputField({ placeholder, onChangeHandler }) {
  const [text, setText] = useState("");
  return (
    <div className="inputfield">
      <input
        type="text"
        value={text}
        placeholder={placeholder}
        onChange={(e) => {
          setText(e.target.value);
          onChangeHandler(e.target.value);
        }}
      />
    </div>
  );
}

export default InputField;
