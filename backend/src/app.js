import express from 'express'
import cors from "cors"
import cookieParser from 'cookie-parser'
const app = express()
app.use(cookieParser())
app.use(cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true
}))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from './routes/user.routes.js'
import departmentRouter from './routes/department.routes.js'
import jobTypeRouter from './routes/jobType.routes.js'
import jobNatureRouter from "./routes/jobNature.routes.js";
import designationRouter from "./routes/designation.routes.js";
import employeeRouter from "./routes/employee.routes.js";
import salaryRouter from "./routes/salary.routes.js"
import errorHandler from './middlewares/errorHandler.js'



app.use("/api/v1/user", userRouter);

app.use("/api/v1/department", departmentRouter);

app.use("/api/v1/jobType", jobTypeRouter);

app.use("/api/v1/jobNature", jobNatureRouter);

app.use("/api/v1/designation", designationRouter);

app.use("/api/v1/employee", employeeRouter);

app.use("/api/v1/salary", salaryRouter);

app.use(errorHandler)

export {app}
