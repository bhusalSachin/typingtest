import React, { useEffect, useState } from "react";
import "./Alertbox.css";
import { useSocket } from "../context/SocketProvider";

function Alertbox() {
  const socket = useSocket();
  //   const [msgState, setMsgState] = useState({ state: false, msg: "" });
  const [msg, setMsg] = useState(null);
  useEffect(() => {
    if (socket == null) return;

    socket.on("alertmsg", (msg) => {
      setMsg(msg);

      setTimeout(() => {
        setMsg(null);
      }, 10000);
    });
  }, [socket, msg]);
  return msg ? (
    <div className="alertbox">
      <span>Alert:</span>
      <span>{msg}</span>
    </div>
  ) : null;
}

export default Alertbox;
