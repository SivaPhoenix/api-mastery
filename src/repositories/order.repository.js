const Order=require("../models/order.model")

const create= async(orderData)=>{
    return Order.create(orderData);
}

const findById=async(orderId)=>{
    return Order.findById(orderId);
}

const findByOrderNumber=async(orderNumber)=>{
    return Order.findOne({orderNumber});
}

const findByUserId=async(userId)=>{
    return Order.find({userId})
    .sort({
        createAt:-1,
        _id:-1
    });
}



module.exports={
    create,
    findById,
    findByOrderNumber,
    findByUserId
}