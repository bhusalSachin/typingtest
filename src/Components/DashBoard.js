import React from "react";
import Host from "./Host";
import Player from "./Player";

function DashBoard({ onRoomEntry }) {
  return onRoomEntry.isPlayer ? (
    <Player roomId={onRoomEntry.id} username={onRoomEntry.username} />
  ) : (
    <Host id={onRoomEntry.id} />
  );
}

export default DashBoard;
