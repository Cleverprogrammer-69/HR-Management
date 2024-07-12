import { verifyJWT } from "../middlewares/auth.middleware.js"
import { registerDepartment } from "../controllers/department.controllers.js"
import { Router } from "express"
const router = Router()

router.use(verifyJWT)

router.route("/register").post(registerDepartment)

export default router
