const User=require("../models/user.model")


const create =async(userData)=>{
    return User.create(userData);
}

const findByEmail=async(email)=>{
    return User.findOne({email});
};

module.exports={
    create,
    findByEmail
}