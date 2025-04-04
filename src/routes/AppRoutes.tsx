import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/Login";
import Tasks from "../pages/Tasks";
import Register from "../pages/Register";
import Home from "../pages/Home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/tasks"
        element={
          <PrivateRoute>
            <Tasks />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
