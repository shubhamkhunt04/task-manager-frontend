import axios from "axios";
import { store } from "../app/store";
import { notification } from "antd";
import { logout } from "../features/auth/authSlice";

// Create Axios instance
const api = axios.create({
  baseURL: "http://localhost:3000/api", // Adjust this according to your backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor (Attach JWT Token)
api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor (Handle Errors)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle Unauthorized (Token Expired)
      if (error.response.status === 401) {
        store.dispatch(logout());
        notification.error({
          message: "Session expired. Please log in again.",
        });
      }
    } else {
      notification.error({ message: "Network Error. Please try again." });
    }
    return Promise.reject(error);
  }
);

export default api;
