const express = require("express");
const {
  createOrder,
  handleWebhook,
  createOrderDirect,
} = require("../controllers/paymentController");
const { isVerifiedUser } = require("../middlewares/tokenVerification");

const router = express.Router();

router.route("/webhook").post(handleWebhook);
router.route("/create-order").post(isVerifiedUser, createOrder);
router.route("/create-order-direct").post(isVerifiedUser, createOrderDirect);

module.exports = router;
