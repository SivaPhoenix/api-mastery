const mongoose=require("mongoose");
const env=require("./env");

const connectDB=async()=>{
    try{
        await mongoose.connect(env.mongoUri);
        console.log("MongoDB connected successfully");
    }
    catch(err){
        console.log("Error connecting to MongoDB:",err.message);
        process.exit(1);
    }
};  
module.exports=connectDB;