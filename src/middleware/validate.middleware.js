const validate=(schema,property)=>{
    return (req,res,next)=>{
        const {error,value}=schema.validate(req[property]);

        if(error){

            const validationError=new Error(
                "Request Validation failed"
            );
            validationError.code="VALIDATION_ERROR";
            validationError.status=400;
            validationError.details=error.details.map(
                (detail)=>({
                    field:detail.path.join("."),
                    message:detail.message
                })
            );
            return next(validationError);
        }
        req[property]=value;
        next();
    }
}

module.exports=validate;