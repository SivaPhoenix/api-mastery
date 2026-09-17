const express=require("express")
const router=express.Router();
const { register,login,getCurrentUser } = require("../controllers/auth.controller");
const validate = require("../middleware/validate.middleware");
const { registerSchema,loginSchema } = require("../schemas/auth.schema");
const authenticate = require("../middleware/auth.middleware");

router.post("/register", validate(registerSchema, "body"), register);
router.post("/login", validate(loginSchema, "body"), login);
router.get("/me",authenticate,getCurrentUser)

module.exports=router;