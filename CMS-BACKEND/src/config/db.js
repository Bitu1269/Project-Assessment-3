const mongoose = require("mongoose");

const connectDB = async () => {
    const uri = process.env.MONGO_URI;
    if (!uri) {
        console.warn("MONGO_URI not set; skipping MongoDB connection (running without DB).");
        return;
    }

    try {
        await mongoose.connect(uri);
        console.log("MongoDB Connected");
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err.message || err);
        // Do not exit process here so the server can still be used for local testing of non-DB routes.
    }
};

module.exports = connectDB;
