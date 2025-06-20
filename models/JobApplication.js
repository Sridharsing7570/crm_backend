// models/JobApplication.js
const mongoose = require("mongoose");

const statusEnum = ["Applied", "Interview", "Offer", "Rejected", "Accepted"];

const JobApplicationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        companyName: {
            type: String,
            required: true,
            trim: true,
        },
        jobTitle: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            enum: statusEnum,
            default: "Applied",
        },
        appliedDate: {
            type: Date,
            default: Date.now,
        },
        notes: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("JobApplication", JobApplicationSchema);
