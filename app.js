// app.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./middleware/errorHandler");

// Route files
const auth = require("./routes/auth.routes");
const jobs = require("./routes/jobs.routes");
const notifications = require("./routes/notifications.routes");

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Enable CORS
app.use(cors());

// Mount routers
app.use("/api/auth", auth);
app.use("/api/jobs", jobs);
app.use("/api/notifications", notifications);

// Error handler middleware
app.use(errorHandler);

module.exports = app;
