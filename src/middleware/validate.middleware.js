const ApiError = require("../utils/api-error");
const ERROR_CODES = require("../constants/error-codes");
const HTTP_STATUS = require("../constants/http-status");

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
                    HTTP_STATUS.BAD_REQUEST,
                    ERROR_CODES.VALIDATION_ERROR,
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