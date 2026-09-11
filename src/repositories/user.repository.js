const User = require("../models/user.model")


const create = async (userData) => {
    return User.create(userData);
}

const findByEmail = async (email) => {
    return User.findOne({ email });
};

const findById = async (id) => {
    return User.findById(id)
}

const updateById=async(id,updateData)=>{
    return User.findByIdAndUpdate(
        id,
        updateData,
        {
            returnDocument: 'after',
            runValidators: true
        })
}

const deleteById=async(id)=>{
    return User.findByIdAndDelete(id);
}

module.exports = {
    create,
    findByEmail,
    findById,
    updateById,
    deleteById
}