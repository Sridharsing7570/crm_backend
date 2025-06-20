// services/notifications.service.js
const Notification = require("../models/Notification");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

exports.createNotification = async (userId, message, sendEmail = false) => {
    const notification = new Notification({
        user: userId,
        message,
    });

    await notification.save();

    if (sendEmail) {
        // In a real app, you would fetch the user's email here
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: "user@example.com", // Replace with actual user email
            subject: "Job Application Update",
            text: message,
        });
    }

    return notification;
};

exports.getUserNotifications = async (userId) => {
    return await Notification.find({ user: userId }).sort({ createdAt: -1 }).exec();
};

exports.markAsRead = async (notificationId, userId) => {
    return await Notification.findOneAndUpdate(
        { _id: notificationId, user: userId },
        { isRead: true },
        { new: true }
    );
};
