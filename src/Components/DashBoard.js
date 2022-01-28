import React, { useEffect } from "react";
import Host from "./Host";
import Player from "./Player";
import { useSocket } from "../context/SocketProvider";

function DashBoard({ onRoomDisbound, onRoomEntry }) {
  const socket = useSocket();

  useEffect(() => {
    if (socket == null) return;

    socket.on("hostleft", () => {
      console.log("leaving....");
      setTimeout(() => {
        onRoomDisbound({
          id: null,
          isPlayer: false,
          username: null,
        });
      }, 4000);
    });
  });
  return onRoomEntry.isPlayer ? (
    <Player roomId={onRoomEntry.id} username={onRoomEntry.username} />
  ) : (
    <Host id={onRoomEntry.id} />
  );
}

export default DashBoard;
