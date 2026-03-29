require("dotenv").config();

const config = Object.freeze({
  port: process.env.PORT || 3000,
  databaseURL: process.env.MONGODB_URL,
  nodeEnv: process.env.NODE_ENV || "development",
  accessTokenSecret: process.env.JWT_SECRET,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  frontendUrl: process.env.FRONTEND_URL,
});

module.exports = config;
