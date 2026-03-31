const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerDetails: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      guests: { type: Number, required: true },
    },
    orderStatus: {
      type: String,
      required: true,
      enum: ["Pending", "Preparing", "Ready", "Paid", "Completed"],
      default: "Pending",
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    bills: {
      total: { type: Number, required: true },
      tax: { type: Number, required: true },
      totalWithTax: { type: Number, required: true },
    },
    items: [
      {
        name: { type: String, required: true },
        pricePerQuantity: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    table: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
      default: null,
    },
    // ✅ If you want to store payment method, add it here properly
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "qr"],
      default: null,
    },
  },
  { timestamps: true },
);

// Indexes for better query performance
orderSchema.index({ orderStatus: 1 });
orderSchema.index({ table: 1 });
orderSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Order", orderSchema);
