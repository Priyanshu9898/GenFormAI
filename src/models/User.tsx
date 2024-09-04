import mongoose, { Schema, Document } from "mongoose";

export interface UserModelType extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  authProviderId: string;
  forms: Schema.Types.ObjectId[];
}

const UserSchema: Schema<UserModelType> = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter a valid email address."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a valid password."],
    },
    firstName: {
      type: String,
      required: [true, "Please enter a valid first name."],
    },
    lastName: {
      type: String,
      required: [true, "Please enter a valid last name."],
    },
    role: {
      type: String,
      default: "user",
    },
    authProviderId: {
      type: String,
    },
    forms: [
      {
        type: Schema.Types.ObjectId,
        ref: "Form",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UserModel =
  (mongoose.models?.User<UserModelType> as mongoose.Model<UserModelType>) ||
  mongoose.model<UserModelType>("User", UserSchema);

export default UserModel;
