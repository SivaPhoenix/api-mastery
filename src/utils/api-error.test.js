const ApiError = require("./api-error");

const error = new ApiError(
    404,
    "USER_NOT_FOUND",
    "User not found"
);

console.log(error);
console.log("status:", error.status);
console.log("code:", error.code);
console.log("message:", error.message);