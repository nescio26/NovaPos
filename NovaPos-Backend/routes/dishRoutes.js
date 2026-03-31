const express = require("express");
const {
  createDish,
  getDishes,
  getDishById,
  updateDish,
  deleteDish,
  toggleDishAvailability,
} = require("../controllers/dishController");
const { isVerifiedUser } = require("../middlewares/tokenVerification"); // ✅ Correct path

const router = express.Router();

// Public routes (no authentication needed)
router.get("/", getDishes);
router.get("/:id", getDishById);

// Protected routes (require authentication)
router.post("/", isVerifiedUser, createDish);
router.put("/:id", isVerifiedUser, updateDish);
router.delete("/:id", isVerifiedUser, deleteDish);
router.patch(
  "/:id/toggle-availability",
  isVerifiedUser,
  toggleDishAvailability,
);

module.exports = router;
