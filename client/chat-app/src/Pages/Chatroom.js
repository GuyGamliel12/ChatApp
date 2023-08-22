import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ChatroomPage = ({ socket }) => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState("");
  const [messageInput, setMessageInput] = useState("");

  const sendMessage = () => {
    if (socket && messageInput.trim() !== "") {
      socket.emit("chatroomMessage", {
        chatroomId: id,
        message: messageInput,
      });
      setMessageInput("");
    }
    console.log(messages);
  };

  useEffect(() => {
    const token = localStorage.getItem("CC_Token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload.id);
    }
    if (socket) {
      socket.on("newMessage", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", {
        chatroomId: id,
      });
    }

    return () => {
      if (socket) {
        socket.emit("leaveRoom", {
          chatroomId: id,
        });
      }
    };
  }, [socket, id]);

  return (
    <div className="bg-gray-900 h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 rounded-lg bg-white text-white">
        <div className="text-2xl font-semibold mb-4">Chatroom Name</div>
        <div className="overflow-y-auto max-h-80 mb-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={
                "text-black font-semibold mb-2 " +
                (userId === m.userId ? "text-right" : "text-left")
              }
            >
              <span>
                {m.name}: {m.message}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center">
          <input
            type="text"
            name="message"
            placeholder="Say something!"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            className="flex-grow p-2 rounded-md bg-gray-100 text-black mr-2"
          />
          <button
            className="px-4 py-2 rounded-md bg-black text-white"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatroomPage;
