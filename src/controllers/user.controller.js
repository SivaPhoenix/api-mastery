const userService = require("../services/user.service")

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

const getUsers=async (req,res,next)=>{
    try {   
        const filters={};
        if(req.query.gender){
            filters.gender=req.query.gender;
        }
        if(req.query.city){
            filters.city=req.query.city;
        }
        if(req.query.country){
            filters.country=req.query.country;
        }
        if(req.query.role){
            filters.role=req.query.role;
        }
        if(req.query.status){
            filters.status=req.query.status;
        }
        if (req.query.minAge) {
            filters.age = {
                ...filters.age,
                $gte: Number(req.query.minAge)
            };
        }

        //search
        if(req.query.search){
            filters.$or=[
                {
                    name:{
                        $regex:req.query.search,
                        $options:'i'
                    }
                },
                {
                    email:{
                        $regex:req.query.search,
                        $options:'i'
                    }
                }
            ]
        }

        //comparing operators
        if (req.query.maxAge) {
            filters.age = {
                ...filters.age,
                $lte: Number(req.query.maxAge)
            };
        }

        //sorting

        let sort={
            createdAt:-1,
            _id:-1
        };
        if(req.query.sortBy){
            const sortOrder=req.query.sortOrder === "desc" ? -1 : 1;
            sort = {
                [req.query.sortBy]: sortOrder,
                _id: -1
            };
        }

        //pagination
        const page=req.query.page===undefined?1:Number(req.query.page);
        const limit=req.query.limit===undefined?10:Number(req.query.limit);

        if(!Number.isInteger(page)||page<1){
            const error=new Error("Page Must be an interger greater than or equal to 1")
            error.status=400;
            error.code="INVALID_PAGE";
            
            throw error;
        }

        if (!Number.isInteger(limit)||limit<1||limit>100){
            const error=new Error("Limit Must be an interger between 1 and 100")
            error.status=400;
            error.code="INVALID_LIMIT";
            throw error;
        }

        const skip=(page-1)*limit;

        //service

        const result=await userService.getUsers(filters,sort,skip,limit);

        //pagination metadata
        const totalPages=Math.ceil(
            result.total/limit
        );

        const hasNextPage=page<totalPages;
        const hasPreviousPage=page>1;
        
        //response
        res.status(200).json({
            data:result.users.map((user)=>({
                    id:user._id,
                    name:user.name,
                    email:user.email,
                    role:user.role,
                    status:user.status,
                    age:user.age,
                    gender:user.gender,
                    city:user.city,
                    country:user.country,
                    phone:user.phone,
                    createdAt:user.createdAt,
                    updatedAt:user.updatedAt
            })),
            pagination:{
                page,
                limit,
                total:result.total,
                totalPages,
                hasNextPage,
                hasPreviousPage
            }
        })
    } catch (error) {
        next(error)
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
    getUsers,
    updateById,
    patchUser,
    deleteById,
    headUser,
    optionUser
}