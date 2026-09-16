const mongoose=require("mongoose")
const orderRepository = require("../repositories/order.repository");
const userRepository = require("../repositories/user.repository");
const productRepository = require("../repositories/product.repository");



const generateOrderNumber = async () => {
  const timestamp = Date.now();
  const randomPart = Math.floor(100000 + Math.random() * 900000);

  return `PF-ORD-${timestamp}-${randomPart}`;
};

const createOrder = async (orderData) => {
  // CHeck the user Existence
  const user = await userRepository.findById(orderData.userId);

  if (!user) {
    const error=new Error("User Not Found");
    error.status=404;
    error.code = "USER_NOT_FOUND";
    throw error;
  }

  //validate Order items
  if (!Array.isArray(orderData.items) || orderData.items.length === 0) {
    const error = new Error("Order must contains at least one item ");
    error.status=400;
    error.code = "INVALID_ORDER_ITEMS";
    throw error;
  }

  //Build order items
  const orderItems=[];

  for(const item of orderData.items){

    const productId=item.productId

    if(!mongoose.Types.ObjectId.isValid(productId)){
        const error=new Error(`Product ${item.productId} is not valid`);
        error.status=400;
        error.code="INVALID_PRODUCT_ID";
        throw error;
    }

    const product= await productRepository.findById(productId);

    if(!product){
        const error= new Error(`Product ${item.productId} does not exists`);
        error.status=404;
        error.code="PRODUCT_NOT_FOUND";
        throw error;
    }

    if(product.status!=="active"){{const error=new Error(
            `Prodcut ${product.name} is not active`
        );
        error.status=400;
        error.code="PRODUCT_NOT_ACTIVE"
        throw error;
    }}

    if(product.stock<item.quantity){
        const error=new Error(`Insufficient stock for product ${product.name}`);
        error.status=409;
        error.code="INSUFFICIENT_STOCK"
        throw error;
    }

    orderItems.push({
        productId:product._id,
        quantity:item.quantity,
        price:product.price
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

const getOrderById = async (orderId) => {
  const order = await orderRepository.findById(orderId);

  if (!order) {
    const error = new Error("Order Not FOund");
    error.code = 404;
    error.code = "ORDER_NOT_FOUND";
    throw error;
  }
  return order;
};

const getOrderByUserId = async (userId) => {
  const user = await userRepository.findById(userId);

  if (!user) {
    const error = new Error("User Not Found");
    error.code = 404;
    error.code = "USER_NOT_FOUND";
    throw error;
  }

  return orderRepository.findByUserId(userId);
};

module.exports = { createOrder, getOrderById, getOrderByUserId };
