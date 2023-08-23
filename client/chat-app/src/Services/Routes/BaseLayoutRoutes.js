import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Dashboard from "../../Pages/Dashboard";
import Chatroom from "../../Pages/Chatroom";

const BaseLayoutRoutes = ({ socket }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const routes = ["/", "/dashboard", "/chatroom/:id"];
  const initialRoute = "/dashboard";

  useEffect(() => {
    if (location.pathname === "/" && routes && routes?.length && initialRoute) {
      navigate(initialRoute, { replace: true });
    }
  }, [navigate, location.pathname, routes, initialRoute]);

  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard socket={socket} />} />
      <Route path="/chatroom/:id" element={<Chatroom socket={socket} />} />
    </Routes>
  );
};

export default BaseLayoutRoutes;
