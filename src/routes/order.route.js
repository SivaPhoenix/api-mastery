const express=require("express")
const validate = require("../middleware/validate.middleware");
const {createOrderSchema,orderIdParamSchema}=require("../schemas/order.schema")

const orderController=require("../controllers/order.controller");

const router=express.Router();

router.post("/",validate(createOrderSchema,"body"),orderController.createOrder);
router.get("/:orderId",validate(orderIdParamSchema,"params"),orderController.getOrderById);

module.exports=router;