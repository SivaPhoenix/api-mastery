const mongoose = require("mongoose");
const orderRepository = require("../repositories/order.repository");
const userRepository = require("../repositories/user.repository");
const productRepository = require("../repositories/product.repository");

const ApiError = require("../utils/api-error");
const ERROR_CODES = require("../constants/error-codes");
const HTTP_STATUS = require("../constants/http-status");

const generateOrderNumber = () => {
  const timestamp = Date.now();
  const randomPart = Math.floor(100000 + Math.random() * 900000);

  return `PF-ORD-${timestamp}-${randomPart}`;
};

const createOrder = async (orderData) => {
  // CHeck the user Existence
  const user = await userRepository.findById(orderData.userId);

  if (!user) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODES.USER_NOT_FOUND,
      "User not found"
    );
  }

  //validate Order items
  if (!Array.isArray(orderData.items) || orderData.items.length === 0) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODES.INVALID_ORDER_ITEMS,
      "Order must contains at least one item"
    );
  }

  //Build order items
  const orderItems = [];

  for (const item of orderData.items) {
    const productId = item.productId;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_CODES.INVALID_PRODUCT_ID,
        `Product ${productId} is not valid`
      );
    }

    const product = await productRepository.findById(productId);

    if (!product) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        ERROR_CODES.PRODUCT_NOT_FOUND,
        `Product ${productId} does not exist`
      );
    }

    if (product.status !== "active") {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_CODES.PRODUCT_NOT_ACTIVE,
        `Product ${product.name} is not active`
      );
    }

    if (product.stock < item.quantity) {
      throw new ApiError(
        HTTP_STATUS.CONFLICT,
        ERROR_CODES.INSUFFICIENT_STOCK,
        `Insufficient stock for product ${product.name}`
      );
    }

    orderItems.push({
      productId: product._id,
      quantity: item.quantity,
      price: product.price
    });
  }

  // Calculate Total Order Amount
  const totalAmount = orderItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  //Generate Business Order Number
  const orderNumber = generateOrderNumber();

  //Prepare order
  const order = await orderRepository.create({
    orderNumber,
    userId: orderData.userId,
    items: orderItems,
    totalAmount,
    currency: "INR",
    status: "pending",
  });

  return order;
};

const getOrderById = async (orderId,currentUser) => {
  const order = await orderRepository.findById(orderId);

  if (!order) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODES.ORDER_NOT_FOUND,
      "Order not found"
    );
  }

  const isAdmin=currentUser.role=="admin";
  const isOwner=order.userId.toString()===currentUser.sub.toString();

  if(!isAdmin && !isOwner){
    throw new ApiError(
      HTTP_STATUS.FORBIDDEN,
      ERROR_CODES.FORBIDDEN,
      "You do not have permission to view this order"
    )
  }
  return order;
};

const getOrderByUserId = async (userId,currentUser) => {
  
  const isAdmin=currentUser.role=="admin";
  const isOwner=userId.toString()===currentUser.sub.toString();

  if(!isAdmin && !isOwner){
    throw new ApiError(
      HTTP_STATUS.FORBIDDEN,
      ERROR_CODES.FORBIDDEN,
      "You do not have permission to view orders"
    )
  }
  
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODES.USER_NOT_FOUND,
      "User not found"
    );
  }

  return orderRepository.findByUserId(userId);
};

module.exports = { createOrder, getOrderById, getOrderByUserId };
