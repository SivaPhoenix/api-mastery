const bcrypt = require("bcrypt");
const authConfig=require("../config/auth")

const hashPassword=async(password)=>{
    return bcrypt.hash(password,authConfig.saltRounds);
}

const comparePassword = async (password, hash) => {
    return bcrypt.compare(password, hash);
};

module.exports={hashPassword,comparePassword}