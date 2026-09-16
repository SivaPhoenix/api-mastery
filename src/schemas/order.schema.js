const Joi=require("joi")
const mongoose=require("mongoose")

const createOrderSchema=Joi.object({
    userId:Joi.string().required(),
    items:Joi.array()
        .items(
            Joi.object({
                productId:Joi.string().required(),
                quantity:Joi.number().integer().min(1).required()
            })
        )
        .required()
        .min(1)
});

const orderIdParamSchema=Joi.object({
    orderId: Joi.string().required()
    .custom((value,helpers)=>{
        if(!mongoose.Types.ObjectId.isValid(value)){
            return helpers.error("any.invalid")
        }
        return value;
    })
    .messages({
        "any.invalid":"orderId must be a valid MongoDB ObjectID"
    })
})

module.exports={
    createOrderSchema,
    orderIdParamSchema
};