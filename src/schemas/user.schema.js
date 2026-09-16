const Joi=require("joi");

const userListQuerySchema=Joi.object({
    page:Joi.number().integer().min(1).default(1),
    limit:Joi.number().integer().min(1).max(100).default(10),
    sortBy:Joi.string().
    valid(
        "name",
        "email",
        "createdAt",
        "updatedAt"
    )
    .default("createdAt"),

    sortOrder: Joi.string()
    .valid("desc","asc")
    .default("desc"),

    search:Joi.string()
    .trim()
    .max(100)
    .allow("")
})

module.exports={userListQuerySchema}