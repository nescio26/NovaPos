const mongoose = require("mongoose");
const Order = require("../models/orderModel");
const Table = require("../models/tableModel");
const createHttpError = require("http-errors");

const addOrder = async (req, res, next) => {
  try {
    const { customerDetails, orderStatus, bills, items, table } = req.body;

    const newOrder = new Order({
      customerDetails,
      orderStatus,
      bills,
      items,
      table,
    });

    await newOrder.save();

    // If table ID is provided, update the table's currentOrder
    if (table) {
      await Table.findByIdAndUpdate(table, {
        currentOrder: newOrder._id,
      });
    }

    res.status(201).json({
      success: true,
      message: "Order created successfully!",
      data: newOrder,
    });
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("table", "tableNo status")
      .sort({ createdAt: -1 }); // Sort by newest first

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createHttpError(400, "Invalid Order ID!"));
    }

    const order = await Order.findById(id).populate("table", "tableNo status");

    if (!order) {
      return next(createHttpError(404, "Order not found!"));
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createHttpError(400, "Invalid Order ID!"));
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate("table", "tableNo status");

    if (!updatedOrder) {
      return next(createHttpError(404, "Order not found!"));
    }

    res.status(200).json({
      success: true,
      message: "Order updated successfully!",
      data: updatedOrder,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { addOrder, getOrders, getOrderById, updateOrder };
