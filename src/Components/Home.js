import React, { useState, useEffect } from "react";
import "./Home.css";
import TypeArea from "./TypeArea";
import Result from "./Result";
import { WordsContext } from "./ContextProvider";
import { useSocket } from "../context/SocketProvider";

const Home = ({ roomId, username }) => {
  const socket = useSocket();
  const [isComplete, setIsComplete] = useState(false);
  const [words, setWords] = useState({ expectedWords: "", typedWords: "" });

  const checkIfComplete = () => {
    setIsComplete(!isComplete);
  };

  useEffect(() => {
    if (socket == null) return;

    socket.on("testcomplete", (data) => {
      setIsComplete(false);
    });
  }, [socket, isComplete]);

  return (
    <div className="home">
      <div className="header">
        <h1>{username}</h1>
      </div>
      <WordsContext.Provider value={{ words, setWords }}>
        <div className="middle">
          {!isComplete ? (
            <TypeArea checkComplete={checkIfComplete} />
          ) : (
            <Result roomId={roomId} username={username} />
          )}
        </div>
      </WordsContext.Provider>
    </div>
  );
};

export default Home;
