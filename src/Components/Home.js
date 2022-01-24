import React, { useState } from "react";
import "./Home.css";
import TypeArea from "./TypeArea";
import Result from "./Result";
import { WordsContext } from "./ContextProvider";

const Home = () => {
  const [isComplete, setIsComplete] = useState(false);
  const [words, setWords] = useState({ expectedWords: "", typedWords: "" });

  const checkIfComplete = () => {
    setIsComplete(!isComplete);
  };
  return (
    <div className="home">
      <div className="header">
        <h1>How fast can you type?</h1>
      </div>
      <WordsContext.Provider value={{ words, setWords }}>
        <div className="middle">
          {!isComplete ? (
            <TypeArea checkComplete={checkIfComplete} />
          ) : (
            <Result checkComplete={checkIfComplete} />
          )}
        </div>
      </WordsContext.Provider>
    </div>
  );
};

export default Home;
