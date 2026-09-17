const Joi = require("joi")

const registerSchema=Joi.object({
    name: Joi.string().trim().min(2).max(150).required(),
    email: Joi.string().trim().lowercase().required().email().required(),
    password:Joi.string().min(6).max(100).required(),
    age:Joi.number().min(2).max(120),
    gender:Joi.string().valid("male","female","other").required(),
    city:Joi.string().trim().max(100),
    country:Joi.string().trim().max(100),
    phone: Joi.string().trim().max(20)
});

module.exports = { registerSchema };