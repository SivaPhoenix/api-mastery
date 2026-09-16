const mongoose=require("mongoose");

const orderService=require("../services/order.service");


const createOrder=async(req,res,next)=>{
    try {
        const order=await orderService.createOrder(req.body);
        
        res.status(201).json({
            success:true,
            data:{
                id:order._id,
                orderNumber:order.orderNumber,
                userId:order.userId,
                items:order.items,
                totalAmount:order.totalAmount,
                currency:order.currency,
                status:order.status,
                createdAt:order.createdAt,
                updatedAt:order.updatedAt
            }
        })
    } catch (error) {
        next(error);
    }
}

const getOrderById=async(req,res,next)=>{
    try{
        const orderId=req.params.orderId;

        if(!mongoose.Types.ObjectId.isValid(orderId)){
            const error=new Error("Invalid Order ID");
            error.code=400;
            error.code="INVALID_ORDER_ID";
            throw error;
        }

        const order=await orderService.getOrderById(orderId);

        res.status(200).json({
            success:true,
            data:{
                id:order._id,
                orderNumber:order.orderNumber,
                userId:order.userId,
                items:order.items,
                totalAmount:order.totalAmount,
                currency:order.currency,
                status:order.status,
                createdAt:order.createdAt,
                updatedAt:order.updatedAt
            }
        })

    }
    catch(error){
        next(error);
    }
}

const getOrderByUserId=async(req,res,next)=>{
    try{
        const userId=req.params.userId;

        if(!mongoose.Types.ObjectId.isValid(userId)){
            const error=new Error("Invalid User ID");
            error.code=400;
            error.code="INVALID_USER_ID";
            throw error;
        }

        const orders=await orderService.getOrderByUserId(userId);

        res.status(200).json({
            success:true,
            data:orders.map((order)=>({
                id:order._id,
                orderNumber:order.orderNumber,
                userId:order.userId,
                items:order.items,
                totalAmount:order.totalAmount,
                currency:order.currency,
                status:order.status,
                createdAt:order.createdAt,
                updatedAt:order.updatedAt
            }))
        })

    }
    catch(error){
        next(error);
    }
}

module.exports={
    createOrder,
    getOrderById,
    getOrderByUserId
}