const mongoose = require("mongoose");
const orderService = require("../services/order.service");
const ApiError = require("../utils/api-error");
const ERROR_CODES = require("../constants/error-codes");
const HTTP_STATUS = require("../constants/http-status");

const createOrder = async (req, res, next) => {
    try {
        const order = await orderService.createOrder(req.body);
        
        res.status(HTTP_STATUS.CREATED).json({
            success: true,
            data: {
                id: order._id,
                orderNumber: order.orderNumber,
                userId: order.userId,
                items: order.items,
                totalAmount: order.totalAmount,
                currency: order.currency,
                status: order.status,
                createdAt: order.createdAt,
                updatedAt: order.updatedAt
            }
        });
    } catch (error) {
        next(error);
    }
};

const getOrderById = async (req, res, next) => {
    try {
        const orderId = req.params.orderId;

        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            throw new ApiError(
                HTTP_STATUS.BAD_REQUEST,
                ERROR_CODES.INVALID_ORDER_ID,
                "Invalid Order ID"
            );
        }

        const order = await orderService.getOrderById(orderId,req.user);

        res.status(HTTP_STATUS.OK).json({
            success: true,
            data: {
                id: order._id,
                orderNumber: order.orderNumber,
                userId: order.userId,
                items: order.items,
                totalAmount: order.totalAmount,
                currency: order.currency,
                status: order.status,
                createdAt: order.createdAt,
                updatedAt: order.updatedAt
            }
        });
    } catch (error) {
        next(error);
    }
};

const getOrderByUserId = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new ApiError(
                HTTP_STATUS.BAD_REQUEST,
                ERROR_CODES.INVALID_USER_ID,
                "Invalid User ID"
            );
        }

        const orders = await orderService.getOrderByUserId(userId,req.user);

        res.status(HTTP_STATUS.OK).json({
            success: true,
            data: orders.map((order) => ({
                id: order._id,
                orderNumber: order.orderNumber,
                userId: order.userId,
                items: order.items,
                totalAmount: order.totalAmount,
                currency: order.currency,
                status: order.status,
                createdAt: order.createdAt,
                updatedAt: order.updatedAt
            }))
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createOrder,
    getOrderById,
    getOrderByUserId
};