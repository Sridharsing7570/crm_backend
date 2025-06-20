// services/jobs.service.js
const JobApplication = require("../models/JobApplication");

exports.createJobApplication = async (userId, jobData) => {
    const job = new JobApplication({
        ...jobData,
        user: userId,
    });
    return await job.save();
};

exports.getUserJobs = async (userId, filters = {}) => {
    const query = { user: userId };

    if (filters.status) {
        query.status = filters.status;
    }

    if (filters.search) {
        query.$or = [
            { companyName: { $regex: filters.search, $options: "i" } },
            { jobTitle: { $regex: filters.search, $options: "i" } },
        ];
    }

    return await JobApplication.find(query).sort({ appliedDate: -1 }).exec();
};

exports.getJobById = async (jobId, userId) => {
    return await JobApplication.findOne({ _id: jobId, user: userId });
};

exports.updateJob = async (jobId, userId, updateData) => {
    return await JobApplication.findOneAndUpdate({ _id: jobId, user: userId }, updateData, {
        new: true,
    });
};

exports.deleteJob = async (jobId, userId) => {
    return await JobApplication.findOneAndDelete({ _id: jobId, user: userId });
};
