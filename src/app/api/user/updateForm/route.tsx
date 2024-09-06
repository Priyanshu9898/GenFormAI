import connectDB from "@/lib/DBconnect";
import formModel from "@/models/Forms";
import UserModel from "@/models/User";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
  try {
    connectDB();

    const userId = await getDataFromToken(req);
    const user = await UserModel.findOne({ _id: userId }).select("-password");

    // console.log(user);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { formId, jsonFormData } = await req.json();

    // console.log(jsonFormData);

    const isFormPresent = await formModel.findById(formId);

    if (!isFormPresent) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    isFormPresent.jsonForm = jsonFormData["jsonForm"];

    await isFormPresent.save();

    return NextResponse.json(
      {
        message: "FormData Updated successfully",
        success: true,
        form: isFormPresent,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 400 }
    );
  }
};
