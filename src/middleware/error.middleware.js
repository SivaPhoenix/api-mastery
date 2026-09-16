const errorMiddleware=(err,req,res,next)=>{

  //mongo DB duplicate key error 

  if(err.code===11000){
    const duplicateField=Object.keys(err.keyPattern||{})[0];;

    return res.status(409).json({
      success:false,
      error:{
        code:"DUPLICATE_KEY",
        message:`${duplicateField} already exists.`
      }
    })
  }
  if (err.name === "ValidationError") {

        const validationErrors = Object.values(
            err.errors
        ).map((error) => ({
            field: error.path,
            message: error.message
        }));

        return res.status(400).json({
            success: false,
            error: {
                code: "VALIDATION_ERROR",
                message: "Request validation failed",
                details: validationErrors
            }
        });
    }

  const statusCode=err.status || 500;
  res.status(statusCode).json({
    success:false,
    error:{
        code:err.code || "INTERNAL_ERROR",
        message:err.message || "Something went wrong",
        ...(err.details && {
            details: err.details
        })
    }
  })  
};

module.exports=errorMiddleware;