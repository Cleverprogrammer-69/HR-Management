import mongoose from 'mongoose';
import dotenv from 'dotenv'
import { DB_NAME } from '../constants.js';
import autoIncrement from "mongoose-sequence";
dotenv.config()
const AutoIncrement = autoIncrement(mongoose)
const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log("MongoDB connected ! host name:",connectionInstance.connection.host)
    } catch (error) {
        console.log("MonogDB connection error due to : ",error)
        process.exit(1)
    }
}
export default connectDB
export {AutoIncrement}