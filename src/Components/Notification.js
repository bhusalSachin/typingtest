import React, { useEffect, useState } from "react";
import "./Notification.css";
import { useSocket } from "../context/SocketProvider";
import Tab from "./Tab";
import ArrowIcon from "./ArrowIcon";

function Notification() {
  const socket = useSocket();
  const [notification, setNotification] = useState([]);
  const [isHide, setIsHide] = useState(false);

  useEffect(() => {
    if (socket == null) return;
    socket.on("newplayer", (username) => {
      setNotification([`${username} entered the room.`, ...notification]);
    });

    socket.on("playergone", (username) => {
      setNotification([`${username} has disconnected.`, ...notification]);
    });

    socket.on("alertmsg", (msg) => {
      setNotification([`Alert: ${msg}`, ...notification]);
    });

    socket.on("hostleft", (username) => {
      setNotification([
        "Host has abandoned.",
        "Room disbounding.....",
        ...notification,
      ]);
    });
  }, [socket, notification]);

  return (
    <div className={`notification ${isHide && "reduce"}`}>
      <div className={`notification-title ${isHide && "hide"}`}>
        Notifications
      </div>
      <div className={`notifications ${isHide && "hide"}`}>
        {notification.map((elem, indx) => (
          <Tab key={indx} text={elem} isNotification={true} />
        ))}
      </div>
      <ArrowIcon isNotification={true} toggleBar={setIsHide} />
    </div>
  );
}

export default Notification;
