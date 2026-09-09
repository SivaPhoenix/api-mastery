const errorMiddleware=(err,req,res,next)=>{
  console.error(err);
  const statusCode=err.status || 500;
  res.status(statusCode).json({
    success:false,
    error:{
        code:err.code || "INTERNAL_ERROR",
        message:err.message || "Something went wrong"
    }
  })  
};

module.exports=errorMiddleware;