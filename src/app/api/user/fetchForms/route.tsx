import connectDB from "@/lib/DBconnect";
import formModel from "@/models/Forms";
import UserModel from "@/models/User";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  connectDB();

  try {
    const userId = await getDataFromToken(req);
    const user = await UserModel.findOne({ _id: userId }).select("-password");

    // console.log(user);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // console.log(user);

    const formIds = user.forms;

    const forms = await formModel
      .find({ _id: { $in: formIds } })
      .select("_id title description");

    if (!forms || forms.length === 0) {
      return NextResponse.json({ message: "No forms found" }, { status: 404 });
    }

    // Return the forms data (id, formTitle, and description)
    return NextResponse.json(
      { message: "Forms Fetched Successfully", forms: forms },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error", success: false },
      { status: 400 }
    );
  }
};
