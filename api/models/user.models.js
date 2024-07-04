import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: {
      type: Number,
      unique: true,
      required: true,
      default: 0,
    },
    password: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema)