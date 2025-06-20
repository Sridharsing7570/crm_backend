// controllers/jobs.controller.js
const asyncHandler = require("express-async-handler");
const {
    createJobApplication,
    getUserJobs,
    getJobById,
    updateJob,
    deleteJob,
} = require("../services/jobs.service");

// @desc    Get all jobs for user
// @route   GET /api/jobs
// @access  Private
exports.getJobs = asyncHandler(async (req, res) => {
    const jobs = await getUserJobs(req.user.id, req.query);
    res.status(200).json({
        success: true,
        count: jobs.length,
        data: jobs,
    });
});

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Private
exports.getJob = asyncHandler(async (req, res) => {
    const job = await getJobById(req.params.id, req.user.id);

    if (!job) {
        return res.status(404).json({
            success: false,
            message: "Job not found",
        });
    }

    res.status(200).json({
        success: true,
        data: job,
    });
});

// @desc    Create job application
// @route   POST /api/jobs
// @access  Private
exports.createJob = asyncHandler(async (req, res) => {
    const job = await createJobApplication(req.user.id, req.body);

    res.status(201).json({
        success: true,
        data: job,
    });
});

// @desc    Update job application
// @route   PUT /api/jobs/:id
// @access  Private
exports.updateJob = asyncHandler(async (req, res) => {
    const job = await updateJob(req.params.id, req.user.id, req.body);

    if (!job) {
        return res.status(404).json({
            success: false,
            message: "Job not found",
        });
    }

    res.status(200).json({
        success: true,
        data: job,
    });
});

// @desc    Delete job application
// @route   DELETE /api/jobs/:id
// @access  Private
exports.deleteJob = asyncHandler(async (req, res) => {
    await deleteJob(req.params.id, req.user.id);

    res.status(200).json({
        success: true,
        data: {},
    });
});
