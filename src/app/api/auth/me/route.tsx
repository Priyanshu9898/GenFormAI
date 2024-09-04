import { NextRequest, NextResponse } from "next/server";

import { getDataFromToken } from "@/utils/getDataFromToken";
import UserModel from "@/models/User";
import connectDB from "@/lib/DBconnect";

export async function GET(request: NextRequest) {
  connectDB();
  try {
    const userId = await getDataFromToken(request);
    const user = await UserModel.findOne({ _id: userId }).select("-password");
    return NextResponse.json({
      mesaaage: "User found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
