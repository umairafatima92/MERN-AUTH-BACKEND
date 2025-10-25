// server/config/mongodb.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Set mongoose options for better timeout handling
    mongoose.set('strictQuery', false);
    
    // Connect with timeout options
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    
    console.log("✅ MongoDB Connected Successfully");
    console.log(`📍 Database Host: ${mongoose.connection.host}`);
    
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    console.error("Connection String (masked):", process.env.MONGODB_URI?.substring(0, 30) + "...");
    process.exit(1); // Exit process with failure
  }
};

// Handle connection events
mongoose.connection.on("connected", () => {
  console.log("📡 Mongoose connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("📴 Mongoose disconnected");
});

export default connectDB;
