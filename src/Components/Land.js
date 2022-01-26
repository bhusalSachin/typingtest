import React, { useState, useEffect } from "react";
import "./Land.css";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const Land = ({ onRoomEntry }) => {
  const [isPlayer, setIsPlayer] = useState(false);
  const [input, setInput] = useState({ id: null, username: null });

  const createARoom = (e) => {
    e.preventDefault();
    const roomId = uuidv4();
    onRoomEntry({ id: roomId, isPlayer: false, username: "host" });
  };

  const playerEntered = (e) => {
    e.preventDefault();
    setIsPlayer(true);
  };

  const joinRoomRequest = async (e) => {
    e.preventDefault();

    // console.log("submitting....");
    // const response = await axios.post("http://localhost:5000/checkId", {
    //   roomId: input.id,
    //   username: input.username,
    // });
    const response = await axios.post(
      "https://typingtestserver.herokuapp.com/checkId",
      {
        roomId: input.id,
        username: input.username,
      }
    );

    if (response.data.success) {
      console.log(response.data.message);
      onRoomEntry({ id: input.id, isPlayer: true, username: input.username });
    } else {
      console.log(response.data.message);
    }
  };

  return (
    <div className="land">
      <div>How fast can you type?....</div>
      <div className="entry">
        <button onClick={createARoom}>Create a Room</button>
        <button onClick={playerEntered}>Join a Room</button>
      </div>
      <div className="form">
        <input
          placeholder="Please enter room id"
          type="text"
          style={{ display: isPlayer ? "block" : "none" }}
          onChange={(e) => setInput({ ...input, id: e.target.value })}
        />
        <input
          placeholder="Enter unique username"
          type="text"
          style={{ display: isPlayer ? "block" : "none" }}
          onChange={(e) => setInput({ ...input, username: e.target.value })}
        />
        <button
          onClick={joinRoomRequest}
          style={{ display: isPlayer ? "block" : "none" }}>
          Enter
        </button>
      </div>
    </div>
  );
};

export default Land;
