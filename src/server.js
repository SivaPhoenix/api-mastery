const app = require("./app");
const env = require("./config/env");
const connectDB = require("./config/database");

const PORT = env.port;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();
