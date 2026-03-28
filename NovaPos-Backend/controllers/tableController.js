const mongoose = require("mongoose");
const Table = require("../models/tableModel");
const createHttpError = require("http-errors");
// ✅ removed duplicate imports of mongoose and createHttpError

const addTable = async (req, res, next) => {
  try {
    const { tableNo } = req.body;

    if (!tableNo) {
      return next(createHttpError(400, "Please Provide Table No!"));
    }

    const isTablePresent = await Table.findOne({ tableNo });
    if (isTablePresent) {
      return next(createHttpError(400, "Table Already Exist!"));
    }

    const newTable = new Table({ tableNo });
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
    const tables = await Table.find();
    res.status(200).json({ success: true, data: tables });
  } catch (error) {
    next(error);
  }
};

const updateTable = async (req, res, next) => {
  try {
    const { status, orderId } = req.body;
    const { id } = req.params;

    // ✅ single ID validation block
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createHttpError(400, "Invalid Table ID!"));
    }

    const table = await Table.findByIdAndUpdate(
      id,
      { status, currentOrder: orderId },
      { new: true },
    );

    if (!table) {
      return next(createHttpError(404, "Table Not Found!"));
    }

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
