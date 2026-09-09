const express = require("express");
const userRoutes = require("./routes/user.routes");
const errorMiddleware = require("./middleware/error.middleware");


const app = express();

// Middleware
app.use(express.json());

// Routes
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is healthy",
        timestamp: new Date()
    });
});

app.use("/api/v1/users", userRoutes);

app.use(errorMiddleware);

module.exports = app;
