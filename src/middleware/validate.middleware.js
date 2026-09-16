const validate=(schema,property)=>{
    return (req,res,next)=>{
        const {error,value}=schema.validate(req[property]);

        if(error){
            return res.status(400).json({
                success:false,
                error:{
                    code:"VALIDATION_ERROR",
                    message:"Request Validation failed",
                    details:error.details.map((detail)=>({
                        field:detail.path.join("."),
                        message:detail.message
                    }))
                }
            })
        }
        req[property]=value;
        next();
    }
}

module.exports=validate;