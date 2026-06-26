import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("MONGO_URI =", process.env.MONGO_URI); // 👈 DEBUG
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn("MongoDB connection warning (offline fallback mode active):", error.message);
  }
};

export default connectDB;
