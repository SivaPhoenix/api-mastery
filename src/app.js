const express = require("express");
const userRoutes = require("./routes/user.routes");
const orderRoutes = require("./routes/order.route");
const productRoutes=require("./routes/product.route")
const errorMiddleware = require("./middleware/error.middleware");
const authRoutes = require("./routes/auth.route");

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
app.use("/api/v1/orders",orderRoutes);
app.use("/api/v1/products",productRoutes);
app.use("/api/v1/auth",authRoutes)

app.use(errorMiddleware);

module.exports = app;
