import connectDB from "@/lib/DBconnect";
import formModel from "@/models/Forms";
import UserModel from "@/models/User";
import { getDataFromToken } from "@/utils/getDataFromToken";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { formId: string } }
) => {
  await connectDB();
  try {
    const userId = await getDataFromToken(req);
    const { searchParams } = new URL(req.url);
    const formId = searchParams.get("formId"); // Get formId from query params

    console.log(formId);

    if (!formId) {
      return NextResponse.json(
        { message: "formId is required" },
        { status: 400 }
      );
    }

    // Find the user based on the token
    const user = await UserModel.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    console.log(user);

    const formObjectId = new mongoose.Types.ObjectId(
      formId
    ) as unknown as mongoose.Schema.Types.ObjectId;

    const formIndex = user.forms.indexOf(formObjectId);

    if (formIndex === -1) {
      return NextResponse.json(
        { message: "Form not found in user's forms" },
        { status: 404 }
      );
    }

    user.forms.splice(formIndex, 1);
    await user.save();

    // Delete the form from the Form collection
    const form = await formModel.findByIdAndDelete(formObjectId);
    if (!form) {
      return NextResponse.json({ message: "Form not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Form deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error", success: false },
      { status: 404 }
    );
  }
};
