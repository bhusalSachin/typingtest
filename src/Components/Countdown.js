import React, { useState, useEffect } from "react";
import "./Countdown.css";

const Countdown = ({ time, letsStart }) => {
  const [timer, setTimer] = useState(time);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      console.log("running");
      if (timer >= 0) setTimer(timer - 1);
      if (timer === 0) letsStart();
      if (timer === -1) {
        clearInterval(timerInterval);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  });

  return (
    <div className="countdown">
      {timer === -1 ? null : timer === 0 ? (
        <span>Let's Go</span>
      ) : (
        <span>{timer}</span>
      )}
    </div>
  );
};

export default Countdown;
