import mongoose from "mongoose";

type connectionObject = {
  isConnected?: boolean;
};

const connection: connectionObject = {};

const connectDB = async (): Promise<void> => {
  try {
    if (connection.isConnected) {
      console.log("Already connected to DB");
      return;
    }

    if (!process.env.MONGO_URI) {
      throw new Error("MongoURI is missing");
    }

    console.log(
      `Attempting to connect to MongoDB with URI: ${process.env.MONGO_URI}`
    );

    const db = await mongoose.connect(process.env.MONGO_URI, {});

    connection.isConnected = db.connections[0].readyState === 1;

    console.log("Connected to DB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};

export default connectDB;
