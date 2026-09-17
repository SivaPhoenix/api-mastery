const jwt = require("jsonwebtoken")
const env = require("../config/env")

const generateAccessToken=(user)=>{
    return jwt.sign(
        {
            sub:user._id.toString(),
            role:user.role
        },
        env.jwtSecret,{
            expiresIn:"1h"
        }
    )
}

module.exports={
    generateAccessToken
}