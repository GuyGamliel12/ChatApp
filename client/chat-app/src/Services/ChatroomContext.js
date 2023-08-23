import React, { createContext, useContext, useState } from "react";

const ChatroomContext = createContext();

export const useChatroomContext = () => useContext(ChatroomContext);

export const ChatroomProvider = ({ children }) => {
  const [selectedChatroomName, setSelectedChatroomName] = useState("");

  return (
    <ChatroomContext.Provider
      value={{ selectedChatroomName, setSelectedChatroomName }}
    >
      {children}
    </ChatroomContext.Provider>
  );
};
