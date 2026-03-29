import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const login = (data) => api.post("/api/user/login", data);
export const register = (data) => api.post("/api/user/register", data);
export const getUserData = () => api.get("/api/user");
export const logout = () => api.post("/api/user/logout");

export const addTable = (data) => api.post("/api/table/add", data);
export const getTables = () => api.get("/api/table");

// ✅ Add this line — was missing
export const createStripeOrder = (data) =>
  api.post("/api/payment/create-order", data);

export const createDirectOrder = (data) =>
  api.post("/api/payment/create-order-direct", data);
