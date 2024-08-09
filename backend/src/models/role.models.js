import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    role: {
        type: String,
        required:true,
        unique:true
    },
    permissions: [
        {
            type:String,
            required:true
        }
    ]

},{timestamps:true})
export const Role = mongoose.model("Role", roleSchema)