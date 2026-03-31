const Stripe = require("stripe");
const Order = require("../models/orderModel");
const Table = require("../models/tableModel");
const createHttpError = require("http-errors");
const Payment = require("../models/paymentModel");

const findTable = async (tableNo) => {
  const table = await Table.findOne({ tableNo });
  if (!table) throw createHttpError(404, "Table not found!");
  return table;
};

// Only creates order - no payment processing
const createOrder = async (req, res, next) => {
  try {
    const { items, customerDetails, tableId, bills } = req.body;

    const table = await findTable(tableId);

    // Check if table is already booked
    if (table.status === "Booked") {
      throw createHttpError(400, "Table is already booked!");
    }

    const newOrder = new Order({
      customerDetails,
      orderStatus: "Pending",
      bills,
      items,
      table: table._id,
    });
    await newOrder.save();

    await Table.findByIdAndUpdate(table._id, {
      status: "Booked",
      currentOrder: newOrder._id,
    });

    res.status(200).json({
      success: true,
      message: "Order placed successfully!",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error.message);
    next(error);
  }
};

// Create Stripe payment for existing order (used by cashier)
const createStripePaymentForExistingOrder = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  try {
    const { orderId } = req.body;

    // Validate orderId
    if (!orderId) {
      throw createHttpError(400, "Order ID is required");
    }

    // Find the existing order with populated table data
    const order = await Order.findById(orderId).populate("table");
    if (!order) {
      throw createHttpError(404, "Order not found!");
    }

    // Check if order is already paid
    if (order.orderStatus === "Paid" || order.orderStatus === "Completed") {
      throw createHttpError(400, "Order is already paid!");
    }

    // Create line items from order items
    const lineItems = order.items.map((item) => ({
      price_data: {
        currency: "myr",
        product_data: { name: item.name },
        unit_amount: Math.round(item.pricePerQuantity * 100),
      },
      quantity: item.quantity,
    }));

    // Add tax as a line item
    lineItems.push({
      price_data: {
        currency: "myr",
        product_data: { name: "SST (6%)" },
        unit_amount: Math.round(order.bills.tax * 100),
      },
      quantity: 1,
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}&orderId=${orderId}`,
      cancel_url: `${process.env.FRONTEND_URL}/cashier`,
      metadata: {
        orderId: order._id.toString(),
        tableId: order.table._id.toString(),
        customerName: order.customerDetails.name,
      },
    });

    res.status(200).json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    console.error("CREATE STRIPE PAYMENT ERROR:", error.message);
    next(error);
  }
};

const handleWebhook = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.error("Webhook signature error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { orderId, tableId } = session.metadata;

    try {
      // Check if payment already exists to avoid duplicate processing
      const existingPayment = await Payment.findOne({ paymentId: session.id });
      if (existingPayment) {
        console.log(`Payment ${session.id} already processed, skipping...`);
        return res.json({ received: true });
      }

      // Create payment record
      const newPayment = new Payment({
        paymentId: session.id,
        orderId: orderId,
        amount: session.amount_total / 100,
        currency: session.currency,
        status: session.payment_status,
        method: session.payment_method_types?.[0] || "card",
        email: session.customer_details?.email || "",
        contact: session.customer_details?.phone || "",
        createdAt: new Date(),
      });

      await newPayment.save();

      // Update order status to Paid
      await Order.findByIdAndUpdate(orderId, { orderStatus: "Paid" });

      // Free up the table - change from Booked to Available
      await Table.findByIdAndUpdate(tableId, {
        status: "Available",
        currentOrder: null,
      });

      console.log(
        ` Order ${orderId} marked Paid, table ${tableId} is now Available.`,
      );
    } catch (err) {
      console.error("DB update error after webhook:", err.message);
    }
  }

  res.json({ received: true });
};

// Cashier payment handler - for cash and QR payments
const processCashPayment = async (req, res, next) => {
  try {
    const { orderId, tableId, amount, paymentMethod } = req.body;

    // Validate required fields
    if (!orderId || !tableId) {
      throw createHttpError(400, "Order ID and Table ID are required");
    }

    // Check if order exists and is not already paid
    const order = await Order.findById(orderId);
    if (!order) {
      throw createHttpError(404, "Order not found!");
    }

    if (order.orderStatus === "Paid" || order.orderStatus === "Completed") {
      throw createHttpError(400, "Order is already paid!");
    }

    // Create payment record
    const newPayment = new Payment({
      paymentId: `${paymentMethod.toUpperCase()}_${orderId}_${Date.now()}`,
      orderId: orderId,
      amount: amount,
      currency: "myr",
      status: "succeeded",
      method: paymentMethod || "cash",
      email: order.customerDetails?.email || "",
      contact: order.customerDetails?.phone || "",
      createdAt: new Date(),
    });

    await newPayment.save();

    // Update order status to Paid
    await Order.findByIdAndUpdate(orderId, { orderStatus: "Paid" });

    // Free up the table
    await Table.findByIdAndUpdate(tableId, {
      status: "Available",
      currentOrder: null,
    });

    res.status(200).json({
      success: true,
      message: "Payment processed successfully!",
      payment: newPayment,
    });
  } catch (error) {
    console.error("CASH PAYMENT ERROR:", error.message);
    next(error);
  }
};

module.exports = {
  createOrder,
  handleWebhook,
  processCashPayment,
  createStripePaymentForExistingOrder,
};
