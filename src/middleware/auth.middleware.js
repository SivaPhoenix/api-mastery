const jwt=require("jsonwebtoken")
const env=require("../config/env")
const ApiError=require("../utils/api-error")
const HTTP_STATUS=require("../constants/http-status")
const ERROR_CODES=require("../constants/error-codes")

const authenticate=(req,res,next)=>{
    try{
        const authHeader=req.headers.authorization;

        if(!authHeader){
            throw new ApiError(
                HTTP_STATUS.UNAUTHORIZED,
                ERROR_CODES.INVALID_TOKEN,
                "Authentication required"
            )
        }

        if(!authHeader.startsWith("Bearer ")){
            throw new ApiError(
                HTTP_STATUS.UNAUTHORIZED,
                ERROR_CODES.INVALID_CREDENTIALS,
                "Invalid authentication scheme"
            )
        }

        const token=authHeader.split(" ")[1];

        if(!token){
            throw new ApiError(
                HTTP_STATUS.UNAUTHORIZED,
                ERROR_CODES.INVALID_CREDENTIALS,
                "Authentication token missing"
            )
        }

        const decoded=jwt.verify(token,env.jwtSecret);
        req.user={
            sub:decoded.sub,
            role:decoded.role
        };

        next();

    }catch(error){
        next(error)
    }
}

module.exports=authenticate;