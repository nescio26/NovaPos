const express = require("express");
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { isVerifiedUser } = require("../middlewares/tokenVerification"); // ✅ Correct path

const router = express.Router();

// Public routes (no authentication needed)
router.get("/", getCategories);
router.get("/:id", getCategoryById);

// Protected routes (require authentication)
router.post("/", isVerifiedUser, createCategory);
router.put("/:id", isVerifiedUser, updateCategory);
router.delete("/:id", isVerifiedUser, deleteCategory);

module.exports = router;
