const express = require("express");
const {
  register,
  login,
  getUserData,
} = require("../controllers/userController");
const { isVerifiedUser } = require("../middlewares/tokenVerification");

const router = express.Router();

// ✅ MUST be functions
router.post("/register", register);
router.post("/login", login);

router.route("/").get(isVerifiedUser, getUserData).post(register);

module.exports = router;
