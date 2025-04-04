import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { JSX } from "react";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = useAuth();
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
