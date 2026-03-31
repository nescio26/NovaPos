const mongoose = require("mongoose");
const Table = require("../models/tableModel");
const Order = require("../models/orderModel");
const createHttpError = require("http-errors");

const addTable = async (req, res, next) => {
  try {
    const { tableNo, seats } = req.body;

    if (!tableNo) {
      return next(createHttpError(400, "Please Provide Table No!"));
    }

    if (!seats) {
      return next(createHttpError(400, "Please Provide Seats Capacity!"));
    }

    const isTablePresent = await Table.findOne({ tableNo });
    if (isTablePresent) {
      return next(createHttpError(400, "Table Already Exist!"));
    }

    const newTable = new Table({ tableNo, seats, status: "Available" });
    await newTable.save();

    res.status(201).json({
      success: true,
      message: "Table Added!",
      data: newTable,
    });
  } catch (error) {
    next(error);
  }
};

const getTables = async (req, res, next) => {
  try {
    const tables = await Table.find().populate({
      path: "currentOrder",
      select: "customerDetails orderStatus",
    });

    console.log(
      "Fetched tables with statuses:",
      tables.map((t) => ({
        tableNo: t.tableNo,
        status: t.status,
      })),
    );

    res.status(200).json({ success: true, data: tables });
  } catch (error) {
    next(error);
  }
};

const updateTable = async (req, res, next) => {
  try {
    const { status, orderId } = req.body;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createHttpError(400, "Invalid Table ID!"));
    }

    console.log(
      `Updating table ${id} to status: ${status}, orderId: ${orderId}`,
    );

    const table = await Table.findByIdAndUpdate(
      id,
      { status, currentOrder: orderId || null },
      { new: true },
    );

    if (!table) {
      return next(createHttpError(404, "Table Not Found!"));
    }

    console.log(`Table ${table.tableNo} updated to status: ${table.status}`);

    res.status(200).json({
      success: true,
      message: "Table Updated!",
      data: table,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { addTable, getTables, updateTable };
