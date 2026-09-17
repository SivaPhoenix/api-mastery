const authRepository = require("../repositories/auth.repository");
const { hashPassword, comparePassword } = require("../utils/password");

const ApiError = require("../utils/api-error");
const HTTP_STATUS = require("../constants/http-status");
const ERROR_CODES = require("../constants/error-codes");

const register = async (userData) => {
    const existingUser = await authRepository.findByEmail(userData.email);
    
    if (existingUser) {
        throw new ApiError(
            HTTP_STATUS.CONFLICT,
            ERROR_CODES.USER_ALREADY_EXISTS,
            "User with email already exists"
        );
    }
    const hashedPassword = await hashPassword(userData.password);

    const user = await authRepository.createUser({
        name: userData.name,
        email: userData.email,
        passwordHash: hashedPassword,
        age: userData.age,
        gender:userData.gender,
        city:userData.city,
        country:userData.country,
        phone:userData.phone,
        role:"customer",
        status:"active",
    })
    
    return user;
    
}

const login=async(email,password)=>{
    const user=await authRepository.findByEmailWithPassword(email);

    if(!user){
        throw new ApiError(
            HTTP_STATUS.UNAUTHORIZED,
            ERROR_CODES.INVALID_CREDENTIALS,
            "Invalid Email or Password"
        )
    }

    const passwordMatch=await comparePassword(password,user.passwordHash);

    if(!passwordMatch){
        throw new ApiError(
            HTTP_STATUS.UNAUTHORIZED,
            ERROR_CODES.INVALID_CREDENTIALS,
            "Invalid Email or Password"
        )
    }

    if(user.status!=="active"){
        throw new ApiError(
            HTTP_STATUS.FORBIDDEN,
            ERROR_CODES.USER_BLOCKED,
            "User Account is Inactive"
        )
    }

    return user;
}
module.exports={
    register,
    login
}