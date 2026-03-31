import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BACKEND_URL,
  withCredentials: true,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const wakeUpServer = () => api.get("/health").catch(() => {});

//  Request interceptor

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

//  Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      return Promise.reject(
        new Error("Server is waking up, please try again in a moment."),
      );
    }
    if (!error.response) {
      return Promise.reject(
        new Error("Unable to reach the server. Check your connection."),
      );
    }
    return Promise.reject(error);
  },
);

export default api;

//  Auth
export const login = (data) => api.post("/api/user/login", data);
export const register = (data) => api.post("/api/user/register", data);
export const getUserData = () => api.get("/api/user");
export const logout = () => api.post("/api/user/logout");

// User management
export const getAllUsers = () => api.get("/api/user/all");
export const updateUser = ({ userId, ...data }) =>
  api.put(`/api/user/${userId}`, data);
export const deleteUser = (userId) => api.delete(`/api/user/${userId}`);

// Tables
export const addTable = (data) => api.post("/api/table/add", data);
export const getTables = () => api.get("/api/table");
export const updateTable = ({ tableId, ...tableData }) =>
  api.put(`/api/table/${tableId}`, tableData);

// Payments
export const createStripeOrder = (data) =>
  api.post("/api/payment/create-order", data);
export const processCashPayment = (data) =>
  api.post("/api/payment/cash-payment", data);
export const createStripePaymentForOrder = (data) =>
  api.post("/api/payment/create-stripe-payment", data);

// Orders
export const addOrder = (data) => api.post("/api/order", data);
export const getOrders = () => api.get("/api/order");
export const getOrderById = (id) => api.get(`/api/order/${id}`);
export const updateOrderStatus = (orderId, orderStatus) =>
  api.put(`/api/order/${orderId}`, { orderStatus });

// Categories &
export const getCategory = () => api.get("/api/category");
export const getDish = () => api.get("/api/dish");
export const addCategory = (categoryData) =>
  api.post("/api/category", categoryData);
export const addDish = (dishData) => api.post("/api/dish", dishData);
