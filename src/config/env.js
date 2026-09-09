require("dotenv").config();

const env={
    nodeEnv:process.env.NODE_ENV,
    mongoUri:process.env.MONGODB_URI,
    port:Number(process.env.PORT)
};
if(!env.mongoUri) {
    throw new Error("MONGODB_URI not found in env ")
}   
module.exports=env;