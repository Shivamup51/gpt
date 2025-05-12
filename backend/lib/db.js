const mongoose = require("mongoose");

// Global connection promise that can be awaited
let dbConnectionPromise = null;

const connectDB = async () => {
    // Skip if already connected
    if (mongoose.connection.readyState >= 1) return;
    
    return mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000, // Lower timeouts for serverless
        socketTimeoutMS: 15000,
    });
};

module.exports = connectDB;
