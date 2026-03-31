const express = require("express");
const {
  register,
  login,
  getUserData,
  logout,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const { isVerifiedUser } = require("../middlewares/tokenVerification");

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes (require authentication)
router.post("/logout", isVerifiedUser, logout);
router.get("/", isVerifiedUser, getUserData);
router.get("/all", isVerifiedUser, getAllUsers);
router.put("/:id", isVerifiedUser, updateUser);
router.delete("/:id", isVerifiedUser, deleteUser);

module.exports = router;
