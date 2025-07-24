const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB conectado correctamente.");
    }catch (error) {
        console.error("Error conectando a mongoDB:", error);
        throw error;
    }
};

module.exports = connectDB;