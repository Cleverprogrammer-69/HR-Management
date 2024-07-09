import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { userRegValidation, userLoginValidation } from "../validators/userValidation.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import {getAccessAndRefreshTokens} from "../utils/tokenGenerator.js"


const registerUser = asyncHandler(async (req, res) => {
  const { email, phone, password, username, full_name } = req.body;
  //validation of data 👇
  await userRegValidation({ email, phone, username, password });
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
    avatar: avatar?.secure_url,
    full_name
  });

  let createdUser = await User.findById(newUser._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering new user.");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});



const loginUser = asyncHandler(async(req,res)=>{
    const {email, username, password} = req.body
    //validation
    let user = await userLoginValidation({email, username, password})
    if(!user){
      throw new ApiError(401, "User is not authenticated")
    }


    let {accessToken, refreshToken}= await getAccessAndRefreshTokens(user._id)

    let loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    )
    let options = {
      httpOnly: true,
      secure: true
    }
    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse (200,{
          user: loggedInUser, refreshToken, accessToken
        },
        "User loggedIn successfully"
      )
      )
})

export { registerUser, loginUser };
