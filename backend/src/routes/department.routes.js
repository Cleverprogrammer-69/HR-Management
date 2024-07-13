import { verifyJWT } from "../middlewares/auth.middleware.js"
import { getAllDepartments, getOneDepartment, registerDepartment } from "../controllers/department.controllers.js"
import { Router } from "express"
const router = Router()

router.use(verifyJWT)

router
    .route("/")
    .post(registerDepartment)
    .get(getAllDepartments)

router
    .route("/:departmentId")
    .get(getOneDepartment)
export default router
