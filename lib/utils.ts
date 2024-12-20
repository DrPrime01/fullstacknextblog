/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";

export const connectToDB = async (): Promise<void> => {
  if (mongoose.connection?.readyState) {
    console.log("Using existing connection");
    return;
  }

  try {
    const MONGODB_URI = process.env.MONGODB_URI as string;

    if (!MONGODB_URI) {
      throw new Error(
        "MONGODB_URI is not defined in the environment variables."
      );
    }

    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to connect to MongoDB:", error.message);
      throw new Error(error.message);
    }
    console.error("Failed to connect to MongoDB:", error);
    throw new Error("Unknown error occurred while connecting to MongoDB");
  }
};
