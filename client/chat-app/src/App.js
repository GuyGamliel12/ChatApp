import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import IndexPage from "./Pages/IndexPage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Chatroom from "./Pages/Chatroom";
import io from "socket.io-client";
import makePopup from "./Popup";

function App() {
  const [socket, setSocket] = useState(null);

  const setupSocket = () => {
    const token = localStorage.getItem("Token");
    if (token && !socket) {
      const newSocket = io("http://localhost:8000", {
        query: {
          token: localStorage.getItem("Token"),
        },
      });

      newSocket.on("disconnect", () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
        makePopup("error", "Socket Disconnected!");
      });

      newSocket.on("connect", () => {
        makePopup("success", "Socket Connected!");
      });

      setSocket(newSocket);
    }
  };

  useEffect(() => {
    setupSocket();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<Login setupSocket={setupSocket} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard socket={socket} />} />
        <Route path="/chatroom/:id" element={<Chatroom socket={socket} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
