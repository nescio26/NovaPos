const createHttpError = require("http-errors");
const User = require("../models/userModel");

const register = async (req, res, next) => {
  try {
    console.log("BODY:", req.body); // ✅ DEBUG

    const { name, phone, email, password, role } = req.body;

    // ✅ Fix crash (undefined body)
    if (!req.body) {
      return next(createHttpError(400, "Request body is missing!"));
    }

    if (!name || !phone || !email || !password || !role) {
      return next(createHttpError(400, "All fields are required!"));
    }

    const isUserPresent = await User.findOne({ email });

    if (isUserPresent) {
      return next(createHttpError(409, "User already exists!"));
    }

    const newUser = new User({
      name,
      phone,
      email,
      password,
      role,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "New user created!",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    res.json({ message: "Login route working" });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
