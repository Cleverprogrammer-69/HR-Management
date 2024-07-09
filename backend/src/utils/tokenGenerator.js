import mongoose from 'mongoose'
import { User } from '../models/user.models.js'
import { ApiError } from './ApiError.js';
const getAccessAndRefreshTokens = async(userId) => {
    try {
        let user = await User.findById(userId)
        let accessToken = user.getAccessToken()
        let refreshToken = user.getRefreshToken()

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });


        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating tokens for user")
    }
    
};
export { getAccessAndRefreshTokens }