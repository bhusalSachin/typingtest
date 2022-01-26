import React, { useContext, useEffect } from "react";
import { WordsContext } from "./ContextProvider";
import "./Result.css";
import { useSocket } from "../context/SocketProvider";

const Result = ({ roomId, username }) => {
  const { words } = useContext(WordsContext);
  const socket = useSocket();

  const charArray = words.typedWords.split(" ").map((word, indx) => {
    return word.split("");
  });
  const expectedCharArray = words.expectedWords.split(" ").map((word, indx) => {
    return word.split("");
  });
  let noOfChar = 0;
  const timeTaken = 30;
  let count = 0;
  charArray.forEach((array, indx) => {
    array.forEach((char, index) => {
      noOfChar++;
      if (char === expectedCharArray[indx][index]) {
        count++;
      }
    });
  });
  noOfChar += charArray.length;
  count += charArray.length;

  const wpm = Math.round(
    Math.abs(((noOfChar / 5 - (noOfChar - count)) * 60) / timeTaken)
  );

  const accuracy = ((count / noOfChar) * 100).toFixed(2);

  useEffect(() => {
    if (socket == null) return;

    setTimeout(() => {
      socket.emit("testcomplete", { roomId, username, wpm, accuracy });
    }, 5000);
  });

  return (
    <div className="result">
      <span>Result:</span>
      <span>
        {noOfChar} and {count}
      </span>
      <span>No of words that you just typed: {Math.round(noOfChar / 5)}</span>
      <span>Time taken: {timeTaken}s</span>
      <span>
        Words per minute:{wpm}
        wpm
      </span>
      <span>Accuracy: {accuracy}%</span>
      {/* <button
        onClick={(e) => {
          e.preventDefault();
          checkComplete();
        }}>
        Retake Test
      </button> */}
    </div>
  );
};

export default Result;
