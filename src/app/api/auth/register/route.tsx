import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

import UserModel from "@/models/User";
import connectDB from "@/lib/DBconnect";
import User from "@/models/User";

export async function POST(request: NextRequest) {
  connectDB();

  try {
    const reqBody = await request.json();
    const { firstName, lastName, email, password } = reqBody;

    console.log(reqBody);

    //check if user already exists
    const user = await UserModel.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      role: "user",
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    //send verification email

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
