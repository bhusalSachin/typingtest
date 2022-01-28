import React, { useEffect } from "react";
import "./Player.css";
import { useSocket } from "../context/SocketProvider";
import Notification from "./Notification";
import Leaderboard from "./Leaderboard";
import Home from "./Home";
import Alertbox from "./Alertbox";

function Player({ roomId, username }) {
  const socket = useSocket();

  useEffect(() => {
    if (socket == null) return;
    socket.emit("playerentered", { roomId, username });
  }, [socket]);

  return (
    <div className="player">
      <div className="player-side">
        <Leaderboard />
      </div>
      <div className="player-body">
        <Home roomId={roomId} username={username} />
        <Alertbox />
      </div>
      <div className="player-side">
        <Notification />
      </div>
    </div>
  );
}

export default Player;
