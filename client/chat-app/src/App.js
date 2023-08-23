import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./Services/Routes/PrivateRoute";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import io from "socket.io-client";
import makePopup from "./Popup";
import BaseLayoutRoutes from "./Services/Routes/BaseLayoutRoutes";

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
        <Route path="/login" element={<Login setupSocket={setupSocket} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="*"
          exact
          element={
            <PrivateRoute>
              <main>
                <BaseLayoutRoutes socket={socket} />
              </main>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
