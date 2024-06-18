import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const UserSchema: Schema<User> = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

const UserModel =
  (mongoose.models.User<User> as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
