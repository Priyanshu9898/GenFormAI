import formModel from "@/models/Forms";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: Response) => {
  try {
    const { formId } = await req.json();

    if (!formId) {
      return NextResponse.json(
        { message: "Please Enter formID", success: false },
        { status: 400 }
      );
    }

    const form = await formModel.findOne({ _id: formId });

    if (!form) {
      return NextResponse.json(
        { message: "Form is not present.", success: false },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Form fetched successfully.", success: true, formData: form },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
