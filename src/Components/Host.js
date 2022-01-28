import React, { useState, useEffect } from "react";
import "./Host.css";
import Leaderboard from "./Leaderboard";
import Notification from "./Notification";
import { useSocket } from "../context/SocketProvider";
import Button from "./Button";
import InputField from "./InputField";
import { TESTS } from "../variables";

const Host = ({ id }) => {
  const socket = useSocket();
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(true);
  const [players, setPlayers] = useState([]);
  const [isAlert, setIsAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  useEffect(() => {
    if (socket == null) return;

    socket.on("started", () => {
      setStarted(true);
      setDone(false);
    });

    socket.emit("roomCreated", id);

    socket.on("testcomplete", (data) => {
      setStarted(false);
      setDone(true);
    });

    socket.on("allplayers", (players) => {
      setPlayers(players);
    });

    socket.on("playergone", (user, allusers) => {
      setPlayers(allusers);
    });

    socket.on("disconnect", () => {
      socket.connect();
    });
  }, [socket, players, started]);

  const onStart = (e) => {
    e.preventDefault();
    socket.emit("onstart", TESTS[Math.floor(Math.random() * TESTS.length)]);
  };

  const onClickAlert = (e) => {
    e.preventDefault();
    setIsAlert(!isAlert);
  };

  const onAlertSent = (e) => {
    e.preventDefault();

    socket.emit("alertiscoming", alertMsg);
    setIsAlert(false);
  };

  return (
    <div className="host">
      <div className="host-side">
        <Leaderboard />
      </div>
      <div className="host-body">
        <div className="host-title">
          <span>You are the Host now</span>
        </div>
        <div className="roomid">
          <span>Room Id: {id}</span>
        </div>
        <div
          className="onStartButton"
          style={{
            display:
              players.length === 0 || (started && !done) ? "none" : "block",
          }}>
          <Button
            text={"Let's Start"}
            onClick={onStart}
            isIcon={true}
            infoMessage={
              "You can send some information to all the players that will pop on their buttom of screen"
            }
          />
        </div>
        <div
          className="onAlertButton"
          style={{
            display:
              players.length === 0 || (started && !done) ? "none" : "block",
          }}>
          <Button
            text={"Send an alert message to all the players"}
            onClick={onClickAlert}
          />
          <div
            className="alertForm"
            style={{
              display: !isAlert ? "none" : "flex",
            }}>
            <InputField
              placeholder={"Enter your message here!"}
              onChangeHandler={setAlertMsg}
            />
            <Button text={"Send"} onClick={onAlertSent} />
          </div>
        </div>
        <div style={{ display: started && !done ? "block" : "none" }}>
          Players are typing......
        </div>
      </div>
      <div className="host-side">
        <Notification />
      </div>
    </div>
  );
};

export default Host;
