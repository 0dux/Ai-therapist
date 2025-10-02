import mongoose from "mongoose";
import logger from "./logger";

const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";
    await mongoose.connect(mongoURI);
    logger.info("MongoDB connected successfully");
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
