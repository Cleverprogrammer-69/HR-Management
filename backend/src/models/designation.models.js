import mongoose from "mongoose";
import { AutoIncrement } from "../db/index.js";
const designationSchema = new mongoose.Schema(
  {
    _id:{
      type: Number
    },
    designation: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    abbrevation: {
        type: String,
        required:true,
        unique: true
    }
  },
  {_id: false},
  { timestamps: true }
);
designationSchema.plugin(AutoIncrement, {
  id: "designation_id_counter",
  inc_field: "_id",
});
export const Designation = mongoose.model("Designation", designationSchema);
