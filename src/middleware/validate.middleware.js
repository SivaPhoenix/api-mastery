const ApiError = require("../utils/api-error");

const validate=(schema,property)=>{
    return (req,res,next)=>{
        const {error,value}=schema.validate(req[property]);

        if(error){
            const details=error.details.map(
                (detail)=>({
                    field:detail.path.join("."),
                    message:detail.message
                })
            );
            return next(
                new ApiError(
                    400,
                    "VALIDATION_ERROR",
                    "Request Validation failed",
                    details
                )
            );
        }
        req[property]=value;
        next();
    }
}

module.exports=validate;