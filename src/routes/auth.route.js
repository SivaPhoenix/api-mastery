const express=require("express")
const router=express.Router();
const { register } = require("../controllers/auth.controller");
const validate = require("../middleware/validate.middleware");
const { registerSchema } = require("../schemas/auth.schema");

router.post("/register", validate(registerSchema, "body"), register);

module.exports=router;