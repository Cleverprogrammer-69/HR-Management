import mongoose, { get } from "mongoose";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim:true,
      lowercase:true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim:true,
      lowercase:true
    },
    phone: {
      type: Number,
      unique: true,
      required: true,
      default: 0,
    },
    full_name:{
      type:String,
      required: true,
      get(){
        return this.username
      },
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    refreshToken:{
      type: String
    },
    avatar: {
      type: String,
    }
  },
  { timestamps: true }
);

userSchema.pre("save",async function(next){
  if(!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
  return bcrypt.compare(password, this.password)
}

userSchema.methods.getAccessToken =  function(){
  return jwt.sign(
    {
      username: this.username,
      email: this.email,
      phone: this.phone,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXP,
    }
  );
}

userSchema.methods.getRefreshToken = function () {
  return jwt.sign(
    {
      username: this.username,
      email: this.email,
      phone: this.phone,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXP,
    }
  );
};
export const User = mongoose.model("User", userSchema)