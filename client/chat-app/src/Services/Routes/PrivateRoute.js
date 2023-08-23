import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();

  return localStorage.getItem("Token") ? (
    children
  ) : (
    <Navigate to={"/login"} state={{ from: location }} />
  );
};

export default PrivateRoute;
