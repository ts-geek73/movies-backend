
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); 
const uri = process.env.MONGODB_URI;  

if (!uri) {
    console.error("MongoDB URI not found in environment variables");
    process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,  
    });
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);  
  }
};

connectDB();
