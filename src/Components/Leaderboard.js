import React, { useState, useEffect } from "react";
import "./Leaderboard.css";
import { useSocket } from "../context/SocketProvider";
import Tab from "./Tab";

function Leaderboard() {
  const socket = useSocket();
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    if (socket == null) return;
    socket.on("allplayers", (players) => {
      console.log(players);
      setPlayers(players);
    });
  }, [socket, players]);
  return (
    <div className="leader">
      <div>Leaderboard</div>
      {players.map((player, indx) => (
        <Tab key={indx} name={player.username} />
      ))}
    </div>
  );
}

export default Leaderboard;
