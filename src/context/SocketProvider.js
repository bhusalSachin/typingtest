import React, { useContext, useState, useEffect } from "react";
import io from "socket.io-client";

const SocketContext = React.createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ user, id, children }) => {
  const [socket, setSocket] = useState();

  useEffect(() => {
    // const newSocket = io("http://localhost:5000/", {
    //   transports: ["websocket"],
    //   query: { id },
    // });

    const newSocket = io("http://localhost:5000/", {
      transports: ["websocket"],
      query: { user, id },
    });
    // const newSocket = io("wss://typingtestserver.herokuapp.com/", {
    //   transports: ["websocket"],
    //   query: { user, id },
    // });

    setSocket(newSocket);

    return () => newSocket.close();
  }, [id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
