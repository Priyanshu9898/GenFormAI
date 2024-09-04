import connectDB from "@/lib/DBconnect";
import formModel, { FormModelType } from "@/models/Forms";
import UserModel from "@/models/User";
import { getDataFromToken } from "@/utils/getDataFromToken";
import mongoose, { Schema } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    connectDB();
    const userId = await getDataFromToken(req);
    const user = await UserModel.findOne({ _id: userId }).select("-password");

    console.log(user);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { jsonForm } = await req.json();

    const JSONForm = JSON.parse(jsonForm);

    const formTitle = JSONForm.formTitle;
    const formSubheading = JSONForm.formSubheading;
    const formFields = JSONForm.formFields;

    // console.log(formTitle, formSubheading, formFields);

    const newForm = new formModel({
      title: formTitle,
      description: formSubheading || "", // Optional description
      jsonForm: formFields,
    });

    // console.log(newForm.jsonForm);

    const savedForm: FormModelType = await newForm.save();

    user.forms.push(savedForm._id as Schema.Types.ObjectId);

    await user.save();

    // Return a success response
    return NextResponse.json({
      message: "Form created and associated with the user successfully",
      form: savedForm,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
