const express=require("express")

const userController=require("../controllers/user.controller")

const router=express.Router()

router.post("/",userController.createUser);
router.get("/:id",userController.getUserById);
router.put("/:id",userController.updateById);
router.patch("/:id",userController.patchUser);
router.head("/:id",userController.headUser);
router.delete("/:id",userController.deleteById);

module.exports=router