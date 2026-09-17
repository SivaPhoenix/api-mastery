const authService = require("../services/auth.service");
const HTTP_STATUS = require("../constants/http-status");

const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        age: user.age,
        gender: user.gender,
        city: user.city,
        country: user.country,
        phone: user.phone,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register };
