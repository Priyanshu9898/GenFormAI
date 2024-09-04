import mongoose, { Schema, Document } from "mongoose";

export interface FormModelType extends Document {
  title: string;
  description?: string;
  jsonForm: Schema.Types.Mixed;
}

const formSchema: Schema<FormModelType> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter a valid title."],
    },
    description: {
      type: String,
    },
    jsonForm: { type: Schema.Types.Mixed, required: true },
  },
  {
    timestamps: true,
  }
);

const formModel =
  (mongoose.models?.Forms<FormModelType> as mongoose.Model<FormModelType>) ||
  mongoose.model("Forms", formSchema)<FormModelType>;

export default formModel;
