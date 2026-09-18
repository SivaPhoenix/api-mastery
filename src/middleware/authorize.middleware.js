const ApiError=require("../utils/api-error")
const HTTP_STATUS=require("../constants/http-status");
const ERROR_CODES=require("../constants/error-codes")

const authorize=(...allowedRoles)=>{
    return (req,res,next)=>{
        if(!req.user){
            return next(
                new ApiError(
                    HTTP_STATUS.UNAUTHORIZED,
                    ERROR_CODES.INVALID_TOKEN,
                    "Authentication Required"
                )
            )
        }

        if(!allowedRoles.includes(req.user.role)){
            return next(
                new ApiError(
                    HTTP_STATUS.FORBIDDEN,
                    ERROR_CODES.FORBIDDEN,
                    "You do not have permission to perform this action"
                )
            )
        }
        next();
    }
}


module.exports=authorize;
