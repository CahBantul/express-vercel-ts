import mongoose, { Schema, Document } from "mongoose";

// Definisi interface untuk User
type UserDocument = Document & {
  username: string;
  email: string;
  password: string;
};

// Schema untuk User
const UserSchema = new Schema<UserDocument>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true, // Menambahkan createdAt dan updatedAt
  }
);

// Model User
const UserModel = mongoose.model<UserDocument>("User", UserSchema);

export default UserModel;
