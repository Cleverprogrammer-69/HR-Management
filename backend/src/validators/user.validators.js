import validator from "validator";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
async function userRegValidator(userCredentials) {
  const { email, phone, username, password } = userCredentials;

  // Validate all fields not to be empty in a single check
  if (
    Object.values(userCredentials).some((field) => {
      return field?.trim() === "" || !field;
    })
  ) {
    console.log(userCredentials);
    throw new ApiError(400, "All fields can't be empty.");
  }

  if (!validator.isEmail(email)) {
    throw new ApiError(400, "Email isn't valid.");
  }

  if (!validator.isStrongPassword(password)) {
    throw new ApiError(
      400,
      "Password must be at least 8 characters and include uppercase letters, numbers, and special characters."
    );
  }

  if (!validator.isMobilePhone(phone)) {
    throw new ApiError(400, "Phone isn't valid.");
  }

  if (!validator.isAlphanumeric(username)) {
    throw new ApiError(
      400,
      "Username must be alphanumeric (letters and numbers)."
    );
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { phone }, { username }],
  });

  if (existingUser) {
    console.log(existingUser);
    throw new ApiError(409, "Email or phone or username is already in use.");
  }
  return true
}


const userLoginValidator = async (userCredentials) => {
  const { email, username, password } = userCredentials;

  // Validate required fields and empty strings
  if (!email && !username) {
    throw new ApiError(400, "Username or email is required to login");
  }

  if (!password) {
    throw new ApiError(401, "Password is required to login");
  }

  if (!email?.trim() && !username?.trim()) {
    throw new ApiError(400, "Credentials cannot be empty spaces");
  }
  if (!password?.trim()) {
    throw new ApiError(401, "Password can't be empty");
  }
  try {
   
    const user = await User.findOne({
      $or: [
        { username: { $regex: new RegExp(username?.trim(), "i") } }, 
        { email: { $regex: new RegExp(email?.trim(), "i") } }, 
      ],
    });

    if (!user) {
      throw new ApiError(404, "User not found with the provided credentials");
    }

    
    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
      throw new ApiError(401, "Invalid password");
    }

    return user;
  } catch (error) {
    throw error; 
};

}
export { userRegValidator, userLoginValidator };
