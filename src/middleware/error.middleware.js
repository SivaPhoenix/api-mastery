const ERROR_CODES = require("../constants/error-codes");
const HTTP_STATUS = require("../constants/http-status");

const errorMiddleware = (err, req, res, next) => {
  // MongoDB duplicate key error
  if (err.code === 11000) {
    const duplicateField = Object.keys(err.keyPattern || {})[0];

    return res.status(HTTP_STATUS.CONFLICT).json({
      success: false,
      error: {
        code: ERROR_CODES.DUPLICATE_KEY,
        message: `${duplicateField} already exists.`,
      },
    });
  }

  if (err.name === "ValidationError") {
    const validationErrors = Object.values(err.errors).map((error) => ({
      field: error.path,
      message: error.message,
    }));

    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      error: {
        code: ERROR_CODES.VALIDATION_ERROR,
        message: "Request validation failed",
        details: validationErrors,
      },
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      error: {
        code: ERROR_CODES.INVALID_TOKEN,
        message: "Invalid or expired access token",
      },
    });
  }

  if (err.name === "JsonWebTokenError") {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      error: {
        code: ERROR_CODES.INVALID_TOKEN,
        message: "Invalid or expired access token",
      },
    });
  }

  const statusCode = err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  res.status(statusCode).json({
    success: false,
    error: {
      code: err.code || ERROR_CODES.INTERNAL_ERROR,
      message: err.message || "Something went wrong",
      ...(err.details && {
        details: err.details,
      }),
    },
  });
};

module.exports = errorMiddleware;
