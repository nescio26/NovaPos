import nasiLemak from "../assets/images/nasi-lemak.jpg";
import meeGoreng from "../assets/images/mee-goreng.jpg";
import nasiGoreng from "../assets/images/nasi-goreng.jpg";
import rendang from "../assets/images/rendang.jpg";
import asamPedas from "../assets/images/asam-pedas.jpg";
import laksa from "../assets/images/laksa.jpg";
import rotiCanai from "../assets/images/roti-canai.jpg";
import cendol from "../assets/images/cendol.jpg";

/* ---------------- POPULAR DISHES ---------------- */
export const popularDishes = [
  {
    id: 1,
    image: nasiLemak,
    name: "Nasi Lemak",
    price: 10,
    category: "Rice",
    popular: true,
    numberOfOrders: 45,
  },
  {
    id: 2,
    image: nasiGoreng,
    name: "Nasi Goreng Kampung",
    price: 9,
    category: "Rice",
    numberOfOrders: 30,
  },
  {
    id: 3,
    image: meeGoreng,
    name: "Mee Goreng Mamak",
    price: 8,
    category: "Noodles",
    numberOfOrders: 25,
  },
  {
    id: 4,
    image: laksa,
    name: "Laksa Penang",
    price: 12,
    category: "Noodles",
    numberOfOrders: 20,
  },
  {
    id: 5,
    image: asamPedas,
    name: "Ayam Masak Asam Pedas",
    price: 12,
    category: "Main",
    numberOfOrders: 18,
  },
  {
    id: 6,
    image: rendang,
    name: "Daging Rendang",
    price: 18,
    category: "Main",
    popular: true,
    numberOfOrders: 50,
  },
  {
    id: 7,
    image: rotiCanai,
    name: "Roti Canai",
    price: 3,
    category: "Snack",
    numberOfOrders: 40,
  },
  {
    id: 8,
    image: cendol,
    name: "Cendol",
    price: 5,
    category: "Dessert",
    numberOfOrders: 35,
  },
];

/* ---------------- CATEGORY ITEMS ---------------- */
export const riceItems = popularDishes.filter(
  (item) => item.category === "Rice",
);

export const noodleItems = popularDishes.filter(
  (item) => item.category === "Noodles",
);

export const mainItems = popularDishes.filter(
  (item) => item.category === "Main",
);

export const snackItems = popularDishes.filter(
  (item) => item.category === "Snack",
);

export const dessertItems = popularDishes.filter(
  (item) => item.category === "Dessert",
);

/* ---------------- MENUS ---------------- */
export const menus = [
  {
    id: 1,
    name: "All",
    bgColor: "#1f2937",

    icon: "🍽️",
    items: popularDishes,
  },
  {
    id: 2,
    name: "Rice",
    bgColor: "#b73e3e",

    icon: "🍚",
    items: riceItems,
  },
  {
    id: 3,
    name: "Noodles",
    bgColor: "#5b45b0",

    icon: "🍜",
    items: noodleItems,
  },
  {
    id: 4,
    name: "Main Course",
    bgColor: "#285430",

    icon: "🍗",
    items: mainItems,
  },
  {
    id: 5,
    name: "Snacks",
    bgColor: "#735f32",

    icon: "🥟",
    items: snackItems,
  },
  {
    id: 6,
    name: "Desserts",
    bgColor: "#7f167f",

    icon: "🍧",
    items: dessertItems,
  },
];

/* ---------------- TABLES ---------------- */
export const tables = [
  { id: 1, name: "Table 1", status: "Booked", initials: "AM", seats: 4 },
  { id: 2, name: "Table 2", status: "Available", initials: "MB", seats: 6 },
  { id: 3, name: "Table 3", status: "Booked", initials: "JS", seats: 2 },
  { id: 4, name: "Table 4", status: "Available", initials: "HR", seats: 4 },
  { id: 5, name: "Table 5", status: "Booked", initials: "PL", seats: 3 },
  { id: 6, name: "Table 6", status: "Booked", initials: "JS", seats: 2 },
  { id: 7, name: "Table 7", status: "Available", initials: "HR", seats: 4 },
  { id: 8, name: "Table 8", status: "Booked", initials: "PL", seats: 3 },
];

/* ---------------- METRICS ---------------- */
export const metricsData = [
  {
    title: "Revenue",
    value: "RM50,846.90",
    percentage: "12%",
    color: "#025cca",
    isIncrease: false,
  },
  {
    title: "Orders",
    value: "1,234",
    percentage: "16%",
    color: "#02ca3a",
    isIncrease: true,
  },
  {
    title: "Customers",
    value: "980",
    percentage: "10%",
    color: "#f6b100",
    isIncrease: true,
  },
  {
    title: "Tables",
    value: "10",
    percentage: "8%",
    color: "#be3e3f",
    isIncrease: false,
  },
];

/* ---------------- ITEMS DATA ---------------- */
export const itemsData = [
  {
    title: "Total Categories",
    value: "6",
    percentage: "12%",
    color: "#5b45b0",
    isIncrease: false,
  },
  {
    title: "Total Dishes",
    value: "8",
    percentage: "12%",
    color: "#285430",
    isIncrease: true,
  },
  {
    title: "Active Orders",
    value: "5",
    percentage: "12%",
    color: "#735f32",
    isIncrease: true,
  },
  {
    title: "Total Tables",
    value: "8",
    color: "#7f167f",
  },
];

/* ---------------- ORDERS ---------------- */
export const orders = [
  {
    id: "101",
    customer: "Ahmad",
    status: "Ready",
    dateTime: "March 25, 2026 08:30 PM",
    items: 3,
    tableNo: 2,
    total: 35.0,
  },
  {
    id: "102",
    customer: "Siti",
    status: "In Progress",
    dateTime: "March 25, 2026 08:45 PM",
    items: 2,
    tableNo: 1,
    total: 20.0,
  },
];

/* ---------------- BUTTONS ---------------- */
import { MdTableBar, MdCategory } from "react-icons/md";
import { BiSolidDish } from "react-icons/bi";

export const buttons = [
  { label: "Add Table", icon: <MdTableBar />, action: "table" },
  { label: "Add Category", icon: <MdCategory />, action: "category" },
  { label: "Add Dishes", icon: <BiSolidDish />, action: "dishes" },
];

/* ---------------- TABS ---------------- */
export const tabs = ["Metrics", "Orders", "Payments"];
