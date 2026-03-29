const express = require("express");
const {
  register,
  login,
  getUserData,
  logout,
} = require("../controllers/userController");

const { isVerifiedUser } = require("../middlewares/tokenVerification");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", isVerifiedUser, logout);
router.get("/", isVerifiedUser, getUserData);

module.exports = router;
