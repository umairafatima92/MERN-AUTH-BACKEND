
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    
    mongoose.set('strictQuery', false);
    
  
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, 
    });
    
    console.log(" MongoDB Connected Successfully");
    console.log(` Database Host: ${mongoose.connection.host}`);
    
  } catch (error) {
    console.error(" MongoDB Connection Error:", error.message);
    console.error("Connection String (masked):", process.env.MONGODB_URI?.substring(0, 30) + "...");
    process.exit(1); 
  }
};


mongoose.connection.on("connected", () => {
  console.log(" Mongoose connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

export default connectDB;
