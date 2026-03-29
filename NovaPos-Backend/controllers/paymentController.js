const Stripe = require("stripe");
const Order = require("../models/orderModel");
const Table = require("../models/tableModel");
const createHttpError = require("http-errors");

const findTable = async (tableNo) => {
  const table = await Table.findOne({ tableNo });
  if (!table) throw createHttpError(404, "Table not found!");
  return table;
};

const createOrder = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  try {
    const { items, customerDetails, tableId, bills } = req.body;

    const table = await findTable(tableId);

    const newOrder = new Order({
      customerDetails,
      orderStatus: "Pending",
      bills,
      items,
      table: table._id,
    });
    await newOrder.save();

    await Table.findByIdAndUpdate(table._id, {
      status: "Occupied",
      currentOrder: newOrder._id,
    });

    const lineItems = items.map((item) => ({
      price_data: {
        currency: "myr",
        product_data: { name: item.name },
        unit_amount: Math.round(item.pricePerQuantity * 100),
      },
      quantity: item.quantity,
    }));

    lineItems.push({
      price_data: {
        currency: "myr",
        product_data: { name: "SST (6%)" },
        unit_amount: Math.round(bills.tax * 100),
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/menu`,
      metadata: {
        orderId: newOrder._id.toString(),
        tableId: table._id.toString(),
        customerName: customerDetails.name,
      },
    });

    res.status(200).json({
      success: true,
      url: session.url,
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error.message);
    next(error);
  }
};

const createOrderDirect = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  try {
    const { items, customerDetails, tableId, bills, paymentMethod } = req.body;

    const table = await findTable(tableId);

    const newOrder = new Order({
      customerDetails,
      orderStatus: "Paid",
      bills,
      items,
      table: table._id,
    });
    await newOrder.save();

    await Table.findByIdAndUpdate(table._id, {
      status: "Occupied",
      currentOrder: newOrder._id,
    });

    // Record in Stripe as manual payment intent (no card needed)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(bills.totalWithTax * 100),
      currency: "myr",
      payment_method_types: ["card"],
      confirm: false,
      metadata: {
        orderId: newOrder._id.toString(),
        tableId: table._id.toString(),
        customerName: customerDetails.name,
        paymentMethod,
      },
      description: `NovaPos — ${paymentMethod} payment — Order #${newOrder._id}`,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      data: newOrder,
      stripePaymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error("CREATE ORDER DIRECT ERROR:", error.message);
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

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { orderId, tableId } = session.metadata;
    try {
      await Order.findByIdAndUpdate(orderId, { orderStatus: "Paid" });
      await Table.findByIdAndUpdate(tableId, {
        status: "Available",
        currentOrder: null,
      });
      console.log(`Order ${orderId} marked Paid, table ${tableId} freed.`);
    } catch (err) {
      console.error("DB update error after webhook:", err.message);
    }
  }

  res.json({ received: true });
};

module.exports = { createOrder, handleWebhook, createOrderDirect };
