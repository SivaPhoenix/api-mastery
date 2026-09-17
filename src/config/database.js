const mongoose=require("mongoose");
const env=require("./env");

const connectDB=async()=>{
    try{
        await mongoose.connect(env.mongoUri);
        console.log("MongoDB connected successfully");
    }
    catch (err) {
        console.error("Error connecting to MongoDB:", err.message);
        throw new Error("Unable to connect the db");
    }
};  
module.exports=connectDB;