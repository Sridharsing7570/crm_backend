// controllers/notifications.controller.js
const asyncHandler = require("express-async-handler");
const {
  getUserNotifications,
  markAsRead,
  createNotification,
} = require("../services/notifications.service");

// @desc    Get all notifications for user
// @route   GET /api/notifications
// @access  Private
exports.getNotifications = asyncHandler(async (req, res) => {
  const notifications = await getUserNotifications(req.user.id);

  res.status(200).json({
    success: true,
    count: notifications.length,
    data: notifications,
  });
});

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/mark-read
// @access  Private
exports.markAsRead = asyncHandler(async (req, res) => {
  const notification = await markAsRead(req.params.id, req.user.id);

  if (!notification) {
    return res.status(404).json({
      success: false,
      message: "Notification not found",
    });
  }

  res.status(200).json({
    success: true,
    data: notification,
  });
});

// @desc    Create notification
// @route   POST /api/notifications
// @access  Private
exports.createNotification = asyncHandler(async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res
      .status(400)
      .json({ success: false, message: "Message is required" });
  }
  const notification = await createNotification(req.user.id, message);
  res.status(201).json({ success: true, data: notification });
});
