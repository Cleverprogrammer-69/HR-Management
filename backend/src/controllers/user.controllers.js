import {User} from '../models/user.models.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { userValidation } from "../utils/userValidation.js";
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import { uploadToCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async(req,res)=>{
    
    const {email, phone, password, username} = req.body
    //validation of data 👇
    await userValidation({ email, phone, username, password });
    console.log(req.file?.buffer)
    let avatar;

    if (req.file?.buffer) {
        avatar = await uploadToCloudinary(req);
        if (!avatar) {
            throw new ApiError(400, "Error uploading to Cloudinary");
        }
    }
    
    let newUser = await User.create({
        username: username.toLowerCase(),
        email,
        password,
        phone,
        avatar: avatar?.secure_url
    })

    let createdUser = await User.findById(newUser._id).select(
      "-password -refreshToken"
    );

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering new user.")
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    )
})

export {registerUser}