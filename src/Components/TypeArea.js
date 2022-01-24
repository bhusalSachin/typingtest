import React, { useState, useEffect, useRef } from "react";
import "./TypeArea.css";
import { TESTS } from "../variables";
import Countdown from "./Countdown";
import { useContext } from "react/cjs/react.development";
import { WordsContext } from "./ContextProvider";

const TypeArea = ({ checkComplete }) => {
  const textAreaRef = useRef();
  const [isStarted, setIsStarted] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const { words, setWords } = useContext(WordsContext);

  useEffect(() => {
    setWords({
      ...words,
      expectedWords: TESTS[Math.floor(Math.random() * TESTS.length)],
    });
  }, []);

  useEffect(() => {
    if (isStarted) textAreaRef.current.setSelectionRange(0, 0);
  }, [isStarted]);

  const letsStart = () => {
    setIsStarted(true);

    setTimeout(() => {
      setIsStarted(false);
      setIsDone(true);
      setIsClicked(false);
      checkComplete();
    }, 30000);
  };

  return (
    <div className="typearea">
      {isDone ? <span>Time's up!</span> : null}
      <div className="typewords">
        {isClicked ? <p>{words.expectedWords}</p> : null}
        {isClicked ? <Countdown time={3} letsStart={letsStart} /> : null}
      </div>
      <textarea
        ref={textAreaRef}
        placeholder="Click on the button below to start typing!"
        defaultValue={null}
        readOnly={isDone || !isStarted}
        onPaste={(e) => {
          e.preventDefault();
          return false;
        }}
        onChange={(e) => {
          setWords({ ...words, typedWords: e.target.value });
        }}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsClicked(true);
          textAreaRef.current.focus();
        }}>
        Let's Start
      </button>
    </div>
  );
};

export default TypeArea;
