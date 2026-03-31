// https/index.js
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

// User management endpoints
export const getAllUsers = () => api.get("/api/user/all");
export const updateUser = ({ userId, ...data }) =>
  api.put(`/api/user/${userId}`, data);
export const deleteUser = (userId) => api.delete(`/api/user/${userId}`);

// table end points
export const addTable = (data) => api.post("/api/table/add", data);
export const getTables = () => api.get("/api/table");
export const updateTable = ({ tableId, ...tableData }) =>
  api.put(`/api/table/${tableId}`, tableData);

// payment endpoints
export const createStripeOrder = (data) =>
  api.post("/api/payment/create-order", data);
export const processCashPayment = (data) =>
  api.post("/api/payment/cash-payment", data);
export const createStripePaymentForOrder = (data) =>
  api.post("/api/payment/create-stripe-payment", data);

// order endpoints
export const addOrder = (data) => api.post("/api/order", data);
export const getOrders = () => api.get("/api/order");
export const getOrderById = (id) => api.get(`/api/order/${id}`);
export const updateOrderStatus = (orderId, orderStatus) =>
  api.put(`/api/order/${orderId}`, { orderStatus });

// Category and Dish endpoints (ADD THESE)
export const getCategory = async () => {
  const response = await api.get("/api/category");
  return response;
};

export const getDish = async () => {
  const response = await api.get("/api/dish");
  return response;
};

export const addCategory = async (categoryData) => {
  const response = await api.post("/api/category", categoryData);
  return response;
};

export const addDish = async (dishData) => {
  const response = await api.post("/api/dish", dishData);
  return response;
};
