// routes/tableRoute.js
const express = require("express");
const {
  addTable,
  getTables,
  updateTable,
} = require("../controllers/tableController");
const { isVerifiedUser } = require("../middlewares/tokenVerification");

const router = express.Router();

// ✅ Change this to include "/add"
router.post("/add", isVerifiedUser, addTable);

// Keep the others as they are
router.get("/", isVerifiedUser, getTables);
router.put("/:id", isVerifiedUser, updateTable);

module.exports = router;
