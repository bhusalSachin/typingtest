import React, { useState } from "react";
import "./Host.css";
import Leaderboard from "./Leaderboard";
import Notification from "./Notification";
import { useSocket } from "../context/SocketProvider";

const Host = ({ id }) => {
  const socket = useSocket();
  const [showId, setShowId] = useState(false);

  return (
    <div className="host">
      <div className="host-side">
        <Leaderboard />
      </div>
      <div className="host-body">
        <div>You are the Host now</div>
        <div className="info">
          <button
            onClick={(e) => {
              e.preventDefault();
              socket.emit("roomCreated", id);
              setShowId(!showId);
            }}>
            Click here to see the Room ID.
          </button>
          <div style={{ display: !showId && "none" }}>{id}</div>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            socket.emit("onstart");
          }}>
          Let's Start
        </button>
      </div>
      <div className="host-side">
        <Notification />
      </div>
    </div>
  );
};

export default Host;
