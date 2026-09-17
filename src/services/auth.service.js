const authRepository = require("../repositories/auth.repository");
const { hashPassword } = require("../utils/password");

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

module.exports={register}