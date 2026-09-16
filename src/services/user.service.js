const userRepository = require("../repositories/user.repository");
const ApiError = require("../utils/api-error");
const ERROR_CODES = require("../constants/error-codes");
const HTTP_STATUS = require("../constants/http-status");

const createUser = async (userData) => {
    const existingUser = await userRepository.findByEmail(
        userData.email
    );

    if (existingUser) {
        throw new ApiError(
            HTTP_STATUS.CONFLICT,
            ERROR_CODES.USER_ALREADY_EXISTS,
            "User already exists"
        );
    }

    const user = await userRepository.create(userData);

    return user;
};

const getUsers = async (filter, sort, skip, limit) => {
    return userRepository.findAll(
        filter,
        sort,
        skip,
        limit
    );
};

const getUserById = async (id) => {
    const user = await userRepository.findById(id);

    if (!user) {
        throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            ERROR_CODES.USER_NOT_FOUND,
            "User not found"
        );
    }

    return user;
};

const updateUser = async (id, userData) => {
    const user = await userRepository.updateById(id, userData);

    if (!user) {
        throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            ERROR_CODES.USER_NOT_FOUND,
            "User not found"
        );
    }

    return user;
};

const deleteUser = async (id) => {
    const user = await userRepository.deleteById(id);

    if (!user) {
        throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            ERROR_CODES.USER_NOT_FOUND,
            "User not found"
        );
    }

    return user;
};

const checkUserExists = async (id) => {
    const user = await userRepository.findById(id);
    if (!user) {
        throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            ERROR_CODES.USER_NOT_FOUND,
            "User not found"
        );
    }

    return true;
};
module.exports={
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    checkUserExists
}