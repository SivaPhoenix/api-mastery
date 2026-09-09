const userService=require("../services/user.service")

const createUser=async(req,res,next)=>{
    try {
     const user=await userService.createUser(req.body);

     res.status(201).json({
        data:{
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            status:user.status,
            createdAt:user.createdAt
        }
     })
    }catch(error){{
        next(error);
    }}
}

module.exports={
    createUser
}