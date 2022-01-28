import React, { useState, useEffect } from "react";
import "./Tab.css";
import { useSocket } from "../context/SocketProvider";

function Tab({ text, isNotification }) {
  const socket = useSocket();
  const [stats, setStats] = useState({ wpm: null, accuracy: null });

  useEffect(() => {
    if (socket == null) return;

    socket.on("testcomplete", (data) => {
      const { username, netWpm, netAccuracy } = data;

      if (text === username) setStats({ wpm: netWpm, accuracy: netAccuracy });
      else return;
    });
    // socket.on("updatedleader", (players, player) => {
    //   if (player.username === text)
    //     setStats({ wpm: player.netWpm, accuracy: player.netAccuracy });
    //   else return;
    // });
  }, [socket, stats, text]);

  const notificastion = <span>{text}</span>;

  const leader = (
    <div>
      <span>{text}</span>
      <span>NetWpm: {stats.wpm != null ? stats.wpm : 0}</span>
      <span>NetAccuracy: {stats.accuracy != null ? stats.accuracy : 0}%</span>
    </div>
  );
  // const leader = (
  //   <div>
  //     <span>{player.username}</span>
  //     <span>NetWpm: {player.netWpm ? player.netWpm : 0}</span>
  //     <span>NetAccuracy: {player.netAccuracy ? player.netAccuracy : 0}%</span>
  //   </div>
  // );

  return (
    <div className={"tab" + ` ${isNotification && "notification-tab"}`}>
      {isNotification ? notificastion : leader}
    </div>
  );
}

export default Tab;
