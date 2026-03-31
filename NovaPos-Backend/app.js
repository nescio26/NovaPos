require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectDB = require("./config/database");
const globalErrorHandler = require("./middlewares/globalErrorHandler");

const app = express();

// =========================
// 1. CORS CONFIG (IMPORTANT)
// =========================
app.use(
  cors({
    origin: ["http://localhost:5173", "https://nova-pos-delta.vercel.app"],
    credentials: true,
  }),
);
// =========================
// 2. WEBHOOK (Stripe / Payment)
// MUST stay BEFORE express.json()
// =========================
app.use("/api/payment/webhook", express.raw({ type: "application/json" }));

// =========================
// 3. MIDDLEWARES
// =========================
app.use(express.json());
app.use(cookieParser());

// =========================
// 4. DATABASE CONNECTION
// =========================
connectDB();

// =========================
// 5. TEST ROUTE
// =========================
app.get("/", (req, res) => {
  res.json({
    message: "🚀 POS Server is running successfully",
  });
});

// =========================
// 6. ROUTES
// =========================
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/order", require("./routes/orderRoute"));
app.use("/api/table", require("./routes/tableRoute"));
app.use("/api/payment", require("./routes/paymentRoute"));
app.use("/api/category", require("./routes/categoryRoutes"));
app.use("/api/dish", require("./routes/dishRoutes"));

// =========================
// 7. GLOBAL ERROR HANDLER
// =========================
app.use(globalErrorHandler);

// =========================
// 8. START SERVER
// =========================
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 POS server running on port ${PORT}`);
});
