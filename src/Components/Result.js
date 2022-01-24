import React, { useState, useContext, useEffect } from "react";
import { WordsContext } from "./ContextProvider";
import "./Result.css";

const Result = ({ checkComplete }) => {
  const { words, setWords } = useContext(WordsContext);
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

  return (
    <div className="result">
      <span>Result:</span>
      <span>No of words that you just typed: {Math.round(noOfChar / 5)}</span>
      <span>Time taken: {timeTaken}s</span>
      <span>
        Words per minute:{" "}
        {Math.round(
          Math.abs(((noOfChar / 5 - (noOfChar - count)) * 60) / timeTaken)
        )}{" "}
        wpm
      </span>
      <span>Accuracy: {((count / noOfChar) * 100).toFixed(2)}%</span>
      <button
        onClick={(e) => {
          e.preventDefault();
          checkComplete();
        }}>
        Retake Test
      </button>
    </div>
  );
};

export default Result;
