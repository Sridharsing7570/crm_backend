// routes/notifications.routes.js
const express = require("express");
const router = express.Router();
const {
  getNotifications,
  markAsRead,
} = require("../controllers/notifications.controller");
const { protect } = require("../middleware/auth.middleware");

router
  .route("/")
  .get(protect, getNotifications)
  .post(
    protect,
    require("../controllers/notifications.controller").createNotification
  );

router.route("/:id/mark-read").put(protect, markAsRead);

module.exports = router;
