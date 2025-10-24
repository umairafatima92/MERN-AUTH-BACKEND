import mongoose from "mongoose";

console.log(process.env.MONGODB_URI, process.env.SMTP_MAIL);

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database Connected")
    );

    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {}
};

export default connectDB;
