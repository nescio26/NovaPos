const express = require("express");
const {
  createOrder,
  handleWebhook,
  processCashPayment,
  createStripePaymentForExistingOrder, // Add this
} = require("../controllers/paymentController");
const { isVerifiedUser } = require("../middlewares/tokenVerification");

const router = express.Router();

router.route("/webhook").post(handleWebhook);
router.route("/create-order").post(isVerifiedUser, createOrder);
router.route("/cash-payment").post(isVerifiedUser, processCashPayment);
router
  .route("/create-stripe-payment")
  .post(isVerifiedUser, createStripePaymentForExistingOrder); // Add this

module.exports = router;
