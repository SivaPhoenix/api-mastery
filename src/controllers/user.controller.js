const userService = require("../services/user.service").default

const createUser = async (req, res, next) => {
    try {
        const user = await userService.createUser(req.body);

        res.status(201).json({
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
                updatedAt: user.updatedAt
            }
        })
    } catch (error) {
        {
            next(error);
        }
    }
}

const getUserById = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.status(200).json({
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
                updatedAt: user.updatedAt
            }
        })
    } catch (error) {
        next(error);
    }
}

const updateById = async (req, res, next) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        res.status(200).json({
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
                updatedAt: user.updatedAt
            }
        })
    } catch (error) {
        next(error)
    }
}

const patchUser = async (req, res, next) => {
    try {
        const user = await userService.updateUser(
            req.params.id,
            req.body
        )

        res.status(200).json({
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
                updatedAt: user.updatedAt
            }
        })
    } catch (error) {
        next(error)
    }
}

const deleteById = async (req, res, next) => {
    try {
        const user = await userService.deleteUser(req.params.id)

        res.status(200).json({
            message: "User deleted successfully"
        })
    } catch (error) {
        next(error)
    }
}

const headUser = async (req, res, next) => {
    try {
        await userService.checkUserExists(req.params.id);
        res.status(200).end();
    } catch (error) {
        next(error)
    }
}

const optionUser = async (req, res, next) => {
    try {
        res.set({
            "Allow": "GET, PUT, PATCH, DELETE, HEAD, OPTIONS"
        })

        res.status(200).end();
    } catch (error) {
        next(error)
    }
}
module.exports = {
    createUser,
    getUserById,
    updateById,
    patchUser,
    deleteById,
    headUser,
    optionUser
}