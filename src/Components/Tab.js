import React, { useState, useEffect } from "react";
import "./Tab.css";
import { useSocket } from "../context/SocketProvider";

function Tab({ name }) {
  const socket = useSocket();
  const [stats, setStats] = useState({ wpm: null, accuracy: null });

  useEffect(() => {
    if (socket == null) return;

    socket.on("testcomplete", (data) => {
      const { username, wpm, accuracy } = data;

      if (name === username) setStats({ wpm, accuracy });
      else return;
    });
  }, [socket, stats]);

  return (
    <div className="tab">
      <span>
        {stats.wpm == null
          ? name
          : name +
            ": " +
            stats.wpm +
            "wpm with " +
            stats.accuracy +
            "% accuracy"}
      </span>
    </div>
  );
}

export default Tab;
