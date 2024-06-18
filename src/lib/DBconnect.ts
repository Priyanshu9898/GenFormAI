import { connect } from "http2";
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

    const db = await mongoose.connect(process.env.MONGO_URI || "", {});

    connection.isConnected = db.connections[0].readyState === 1;

    console.log("Connected to DB");
  } catch (error) {
    process.exit(1);
  }
};

export default connectDB;
