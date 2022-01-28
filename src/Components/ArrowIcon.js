import React, { useState } from "react";
import "./ArrowIcon.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function ArrowIcon({ isNotification = false, toggleBar }) {
  const [isClicked, setIsClicked] = useState(false);
  const notification = isClicked ? (
    <ArrowBackIosNewIcon />
  ) : (
    <ArrowForwardIosIcon />
  );
  const leader = !isClicked ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />;
  return (
    <div
      className={`arrowIcon ${
        isNotification ? "notificationArrow" : "leaderArrow"
      } ${isClicked && "onArrowClick"}`}
      onClick={(e) => {
        e.preventDefault();
        setIsClicked(!isClicked);
        toggleBar((prev) => {
          return !prev;
        });
      }}>
      {isNotification ? notification : leader}
    </div>
  );
}

export default ArrowIcon;
