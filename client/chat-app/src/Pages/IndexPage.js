import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const IndexPage = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("Token");
    console.log(token);
    if (!token) {
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
  }, [0]);

  return <div></div>;
};

export default IndexPage;
