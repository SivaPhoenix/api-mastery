const User=require("../models/user.model");

const findByEmail=async(email)=>{
    return User.findOne({email});
}

const findByEmailWithPassword=async(email)=>{
    return User.findOne({email}).select("+passwordHash")
}

const createUser=async(userData)=>{
    return User.create(userData);
}

module.exports={findByEmail,findByEmailWithPassword,createUser}