import React, { useState } from "react";
import "./Button.css";
import InfoIcon from "@mui/icons-material/Info";

function Button({ text, onClick }) {
  const [showMsg, setShowMsg] = useState(false);
  return (
    <div className="button">
      <button onClick={onClick}>{text}</button>
    </div>
  );
}

export default Button;
