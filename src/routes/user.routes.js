const express=require("express")

const userController=require("../controllers/user.controller")
const orderController=require("../controllers/order.controller")
const router=express.Router()

router.post("/",userController.createUser);
router.get("/",userController.getUsers)
router.get("/:id",userController.getUserById);
router.put("/:id",userController.updateById);
router.patch("/:id",userController.patchUser);
router.head("/:id",userController.headUser);
router.delete("/:id",userController.deleteById);
router.options("/:id", userController.optionUser);

router.get("/:userId/orders",orderController.getOrderByUserId);


module.exports=router