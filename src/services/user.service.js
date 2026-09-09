const userRepository=require("../repositories/user.repository")

const createUser=async(userData)=>{
    const existingUser=await userRepository.findByEmail(
        userData.email
    );

    if (existingUser){
        const error=new Error("User already Exist");
        error.status=409;
        error.code="USER_ALREADY_EXISTS"

        throw error;
    }

    const user=await userRepository.create(userData);

    return user;
}

module.exports={
    createUser
}