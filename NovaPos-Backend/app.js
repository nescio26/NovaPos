require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const cors = require("cors");

const app = express();
// payment webhook
app.use("/api/payment/webhook", express.raw({ type: "application/json" }));

//  Middleware
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  }),
);
app.use(express.json());
app.use(cookieParser());

//  Connect DB
connectDB();

//  Test route
app.get("/", (req, res) => {
  res.json({ message: "Hello From POS Server!" });
});

//  Routes
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/order", require("./routes/orderRoute"));
app.use("/api/table", require("./routes/tableRoute"));
app.use("/api/payment", require("./routes/paymentRoute"));

// Global Error Handler
app.use(globalErrorHandler);

//  Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`POS server is listening on port ${PORT}`);
});
