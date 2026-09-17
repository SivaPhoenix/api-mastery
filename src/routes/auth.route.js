const express=require("express")
const router=express.Router();
const { register,login } = require("../controllers/auth.controller");
const validate = require("../middleware/validate.middleware");
const { registerSchema,loginSchema } = require("../schemas/auth.schema");

router.post("/register", validate(registerSchema, "body"), register);
router.post("/login", validate(loginSchema, "body"), login);

module.exports=router;