import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    department: {
      type: String,
      required: true,
      unique:true
    },
    description: {
      type: String,
      required: true,
    },
    hod: {
      type: String,
      unique: true,
      required: true,
    },
    abbrevation: {
        type: String,
        unique: true,
        required: true
    },
    is_active: {
        type:Boolean,
        default:true
    }
  },
  { timestamps: true }
);

export const Department = mongoose.model("Department", departmentSchema);
