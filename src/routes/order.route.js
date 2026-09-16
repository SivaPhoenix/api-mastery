const express=require("express")

const orderController=require("../controllers/order.controller");

const router=express.Router();

router.post("/",orderController.createOrder);
router.get("/:orderId",orderController.getOrderById);

module.exports=router;