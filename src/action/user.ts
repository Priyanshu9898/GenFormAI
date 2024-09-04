"use server";

import connectDB from "@/lib/DBconnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";

export const registerUser = async ({
  firstName,
  lastName,
  email,
  password,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  try {
    if (!firstName || !lastName || !email || !password) {
      console.log("Please fill out all fields.");
      return {
        success: false,
        message: "Please fill out all fields.",
      };
    }

    await connectDB();

    const user = await UserModel.findOne({ email });

    if (user) {
      return {
        success: false,
        message: "User already exists.",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return {
      success: true,
      message: "User registered successfully.",
    };
  } catch (error: any) {
    console.log(error.message);
  }
};

export const LoginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  await connectDB();

  if (!email || !password) {
    throw new Error("Please fill out all fields.");
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new Error("User not found.");
  }

  if (user.password !== password) {
    throw new Error("Invalid credentials.");
  }

  return {
    message: "User logged in successfully.",
  };
};
