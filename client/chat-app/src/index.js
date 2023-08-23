import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ChatroomProvider } from "./Services/ChatroomContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChatroomProvider>
    <App />
  </ChatroomProvider>
);
