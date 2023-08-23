import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import makePopup from "../Popup";
import LogoutButton from "../Components/LogoutButton";
import { useChatroomContext } from "../Services/ChatroomContext";

const Dashboard = () => {
  const [chatrooms, setChatrooms] = useState([]);
  const [chatroomName, setChatroomName] = useState("");
  const navigate = useNavigate();
  const { setSelectedChatroomName } = useChatroomContext();

  const handleJoinChatroom = (chatroom) => {
    setSelectedChatroomName(chatroom.name);
    navigate(`/chatroom/${chatroom._id}`);
  };

  const getChatrooms = () => {
    axios
      .get("http://localhost:8000/chatroom", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Token"),
        },
      })
      .then((response) => {
        setChatrooms(response.data);
      })
      .catch((err) => {
        setTimeout(getChatrooms, 3000);
      });
  };

  React.useEffect(() => {
    getChatrooms();
  }, []);

  const createChatroom = () => {
    axios
      .post(
        "http://localhost:8000/chatroom",
        {
          name: chatroomName,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("Token"),
          },
        }
      )
      .then((response) => {
        makePopup("success", response.data.message);
        getChatrooms();
        setChatroomName("");
      })
      .catch((err) => {
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.message
        )
          makePopup("error", err.response.data.message);
      });
  };

  const handleChatroomNameChange = (event) => {
    setChatroomName(event.target.value);
  };

  const handleCreateChatroom = (event) => {
    event.preventDefault();
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex items-center justify-between">
              <h1 className="text-xl  font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                Chatroom
              </h1>
              <LogoutButton />
            </div>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleCreateChatroom}
            >
              <div>
                <label
                  htmlFor="chatroomName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Chatroom Name
                </label>
                <input
                  className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-zinc-950 focus:z-10 sm:text-sm"
                  type="text"
                  name="chatroomName"
                  id="chatroomName"
                  value={chatroomName}
                  onChange={handleChatroomNameChange}
                />
              </div>
              <button
                onClick={createChatroom}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black-500 mt-6"
              >
                Create Chatroom
              </button>
              <div>
                {chatrooms.map((chatroom) => (
                  <div key={chatroom._id} className="flex mb-4 items-center">
                    <p className="w-full text-grey-darkest">{chatroom.name}</p>
                    <button
                      onClick={() => handleJoinChatroom(chatroom)}
                      className="flex-no-shrink p-1 ml-4 mr-2 border-2 rounded-md px-4 bg-yellow-400"
                    >
                      <div>Join</div>
                    </button>
                  </div>
                ))}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
