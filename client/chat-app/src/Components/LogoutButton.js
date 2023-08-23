import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/user/logout");

      localStorage.removeItem("Token");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <button
      className="group relative  flex justify-center py-1 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black-500 mt-4"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

export default LogoutButton;
