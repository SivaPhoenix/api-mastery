const {
    orderIdParamSchema
} = require("./order.schema");

const params = {
    orderId: "6aaa52534b717ce1454e55c8"
};

const { error, value } =
    orderIdParamSchema.validate(params);

if (error) {
    console.log("Validation failed:");
    console.log(error.details);
} else {
    console.log("Validation successful:");
    console.log(value);
}