import React, { useEffect, useState } from "react";
import "./Notification.css";
import { useSocket } from "../context/SocketProvider";
import Tab from "./Tab";

function Notification() {
  const socket = useSocket();
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    if (socket == null) return;
    socket.on("newplayer", (username) => {
      setNotification([...notification, `${username} entered the room`]);
    });
  }, [socket, notification]);

  return (
    <div className="notification">
      <div>Notification</div>
      {notification.map((elem, indx) => (
        // <div key={indx}>{elem}</div>
        <Tab key={indx} name={elem} />
      ))}
    </div>
  );
}

export default Notification;
