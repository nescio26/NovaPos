const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken"); // ✅ FIXED
const User = require("../models/userModel");

const isVerifiedUser = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.accessToken;

    if (!accessToken) {
      return next(createHttpError(401, "Please Provide Token!"));
    }

    const decodeToken = jwt.verify(accessToken, process.env.JWT_SECRET);

    const user = await User.findById(decodeToken._id);
    if (!user) {
      return next(createHttpError(401, "User Not Exist"));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(createHttpError(401, "Invalid Token!"));
  }
};

module.exports = { isVerifiedUser };
