import validator from "validator";
import { ApiError } from "./ApiError.js";
import {User} from '../models/user.models.js'
async function userValidation(user) {
  const { email, phone, username, password } = user;

  // Validate all fields not to be empty in a single check
  if (Object.values(user).some((field) => {
    return field?.trim() === "" || !field
})) {
    console.log(user)
    throw new ApiError(400, "All fields must not be empty.");
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
    console.log(existingUser)
    throw new ApiError(409, "Email or phone or username is already in use.");
  }
}

export { userValidation };
