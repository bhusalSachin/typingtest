import React, { useState, useEffect } from "react";
import "./Leaderboard.css";
import { useSocket } from "../context/SocketProvider";
import Tab from "./Tab";
import ArrowIcon from "./ArrowIcon";

function Leaderboard() {
  const socket = useSocket();
  const [players, setPlayers] = useState([]);
  const [isHide, setIsHide] = useState(false);

  useEffect(() => {
    if (socket == null) return;
    socket.on("allplayers", (players) => {
      setPlayers(players);
    });

    socket.on("playergone", (user, allusers) => {
      setPlayers(allusers);
    });

    // socket.on("updatedleader", (players, player) => setPlayers(players));
  }, [socket, players]);
  return (
    <div className={`leader ${isHide && "reduce"}`}>
      <div className={`leader-title ${isHide && "hide"}`}>Leaderboard</div>
      <div className={`players ${isHide && "hide"}`}>
        {players.map((player, indx) => (
          <Tab key={indx} text={player.username} />
        ))}
      </div>
      <ArrowIcon toggleBar={setIsHide} />
      <div className={`leader-bottom ${isHide && "hide"}`}>
        <span>No of Players: {players.length}</span>
      </div>
    </div>
  );
}

export default Leaderboard;
