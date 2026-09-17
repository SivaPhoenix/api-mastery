require("dotenv").config();

const env = {
  nodeEnv: process.env.NODE_ENV,
  mongoUri: process.env.MONGODB_URI,
  port: Number(process.env.PORT),
  jwtSecret: process.env.JWT_SECRET,
};
if (!env.mongoUri) {
  throw new Error("MONGODB_URI not found in env ");
}
if (!env.jwtSecret) {
  throw new Error("JWT_SECRET not found in env ");
}
module.exports = env;
