import React, { useState } from "react";
import "./App.css";
import Home from "./Components/Home";
import Land from "./Components/Land";
import Host from "./Components/Host";
import { SocketProvider } from "./context/SocketProvider";
import DashBoard from "./Components/DashBoard";

function App() {
  // const [id, setId] = useState(null);
  const [onRoomEntry, setOnRoomEntry] = useState({
    id: null,
    isPlayer: false,
    username: null,
  });

  const host = (
    <SocketProvider id={onRoomEntry.id}>
      <DashBoard onRoomEntry={onRoomEntry} />
    </SocketProvider>
  );

  return (
    <div className="App">
      {onRoomEntry.id ? host : <Land onRoomEntry={setOnRoomEntry} />}
    </div>
  );
}

export default App;
