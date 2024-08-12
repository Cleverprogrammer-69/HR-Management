import mongoose from "mongoose";
import { AutoIncrement } from "../db/index.js";
const departmentSchema = new mongoose.Schema(
  {
    _id:{
      type: Number
    },
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
  {_id: false},
  { timestamps: true }
);
departmentSchema.plugin(AutoIncrement, {
  id: "department_id_counter",
  inc_field: "_id",
});
export const Department = mongoose.model("Department", departmentSchema);
