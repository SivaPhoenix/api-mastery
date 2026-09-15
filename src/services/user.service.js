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

const getUsers=async(filter,sort,skip,limit)=>{
    return userRepository.findAll(
        filter,
        sort,
        skip,
        limit
    );
}

const getUserById=async(id)=>{
    const user=await userRepository.findById(id);

    if (!user){
        const error=new Error("User not Found");
        error.status=404;
        error.code="USER_NOT_FOUND"

        throw error;
    }

    return user;
}

const updateUser= async(id,userData)=>{
    const user = await userRepository.updateById(id,userData);

    if(!user){
        const error = new Error("User Not found");
        error.status=404;
        error.code="USER_NOT_FOUND";

        throw error;
    }

    return user;
}

const deleteUser=async(id)=>{
    const user = await userRepository.deleteById(id);

    if(!user){
        const error = new Error("User Not found");
        error.status=404;
        error.code="USER_NOT_FOUND";

        throw error;
    }

    return user;
}

const checkUserExists=async(id)=>{
    const user=await userRepository.findById(id);
    if(!user){
        const error=new Error("User Not Found")
        error.status=404;
        error.code="USER_NOT_FOUND";
        throw error;
    }

    return true;
}
module.exports={
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    checkUserExists
}