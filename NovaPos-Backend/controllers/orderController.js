const mongoose = require("mongoose");
const Order = require("../models/orderModel");
const createHttpError = require("http-errors");

const addOrder = async (req, res, next) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({
      success: true,
      message: "New order created!",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createHttpError(404, "Invalid Order ID!"));
    }

    const order = await Order.findById(id);
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

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ data: orders });
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const { orderStatus } = req.body;

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createHttpError(404, "Invalid Order ID!"));
    }
    const order = await Order.findByIdAndUpdate(
      id,
      { orderStatus },
      { new: true },
    );
    if (!order) {
      return next(createHttpError(404, "Order not found!"));
    }
    res
      .status(200)
      .json({ success: true, message: "Order updated!", data: order });
  } catch (error) {
    next(error);
  }
};

module.exports = { addOrder, getOrderById, getOrders, updateOrder };
