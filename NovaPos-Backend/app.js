require("dotenv").config();

const express = require("express");
const connectDB = require("./config/database");
const globalErrorHandler = require("./middlewares/globalErrorHandler");

const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ Connect DB
connectDB();

// ✅ Test route
app.get("/", (req, res) => {
  res.json({ message: "Hello From POS Server!" });
});

// ✅ Routes
app.use("/api/user", require("./routes/userRoute"));

// ✅ Global Error Handler
app.use(globalErrorHandler);

// ✅ Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`POS server is listening on port ${PORT}`);
});
