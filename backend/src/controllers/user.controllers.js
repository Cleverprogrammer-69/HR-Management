import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { userRegValidator, userLoginValidator } from "../validators/user.validators.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { getAccessAndRefreshTokens } from "../utils/tokenGenerator.js"

 const options = {
   httpOnly: true,
   secure: true,
   sameSite: 'none'
};

const registerUser = asyncHandler(async (req, res) => {
  const { email, phone, password, username, full_name } = req.body;
  //validation of data 👇
  await userRegValidator({ email, phone, username, password, full_name });
  let avatar;

  if (req.file?.buffer) {
    avatar = await uploadToCloudinary(req);
    if (!avatar) {
      throw new ApiError(400, "Error uploading to Cloudinary.");
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
    .json(new ApiResponse(201, createdUser, "User registered successfully."));
});



const loginUser = asyncHandler(async(req,res)=>{
    const {identifier, password} = req.body
    //validation
    let user = await userLoginValidator({identifier, password})
    if(!user){
      throw new ApiError(401, "User is not authenticated.", ['User is not authenticated.'])
    }
    let { accessToken, refreshToken }= await getAccessAndRefreshTokens(user._id)

    let loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    )
   
    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse (200,{
          user: loggedInUser, refreshToken, accessToken
        },
        "User logged In successfully."

      )
      )
})


const logoutUser = asyncHandler(async (req,res)=>{
  let authenticatedUser = req.user
  await User.findByIdAndUpdate(
    authenticatedUser._id,
    {
        $unset:{
          refreshToken : 1
        }
      
    },
    {
      new: true
    }
  )
  
 
  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
})


const refreshAccessToken = asyncHandler(async(req, res) =>{
  let incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
  
  if(!incomingRefreshToken){
    throw new ApiError(401, "Unauthorized access.")
  }

try {
    let decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    let user = await User.findById(decodedToken._id)
    if(!user){
      throw new ApiError(401,"Invalid Token.")
    }
  
    if(incomingRefreshToken !== user?.refreshToken){
      throw new ApiError(401, "Refresh token is used or expired.")
    }
  
    const {newRefreshToken, accessToken} = await getAccessAndRefreshTokens(user?._id)
    
    
  
    res
    .status(200)
    .cookie("refreshToken", newRefreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(200,{
        refreshToken: newRefreshToken,
        accessToken: accessToken
      },
      "Access Token Refreshed."
     )
    )
} catch (error) {
  throw new ApiError(500, error?.message||"Something went wrong while refreshing the token.")
}

})

export { registerUser, loginUser, logoutUser, refreshAccessToken };
