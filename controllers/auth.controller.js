// controllers/auth.controller.js
const asyncHandler = require("express-async-handler");
const { register, login, getCurrentUser } = require("../services/auth.service");
const User = require("../models/User");

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res) => {
  const user = await register(req.body);
  res.status(201).json({
    success: true,
    data: user,
  });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await login(email, password);

  res.status(200).json({
    success: true,
    token,
    data: user,
  });
});

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res) => {
  const user = await getCurrentUser(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Update current user
// @route   PUT /api/auth/me
// @access  Private
exports.updateMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  const { firstName, lastName, password } = req.body;
  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (password) user.password = password;
  await user.save();
  res.status(200).json({ success: true, data: user });
});
