// routes/jobs.routes.js
const express = require("express");
const router = express.Router();
const {
    getJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
} = require("../controllers/jobs.controller");

const { protect } = require("../middleware/auth.middleware");

router.route("/").get(protect, getJobs).post(protect, createJob);

router.route("/:id").get(protect, getJob).put(protect, updateJob).delete(protect, deleteJob);

module.exports = router;
