const User = require("../models/user.model")


const create = async (userData) => {
    return User.create(userData);
}

const findAll=async (
    filter={},
    sort={},
    skip=0,
    limit=10
)=>{
    const users = await User.find(filter).
            sort(sort).
            skip(skip).
            limit(limit);
    
    const total=await User.countDocuments(filter);

    return {users,total};
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
    findAll,
    findByEmail,
    findById,
    updateById,
    deleteById
}