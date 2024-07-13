import { verifyJWT } from "../middlewares/auth.middleware.js"
import { getAllDepartments, getOneDepartment, registerDepartment, updateDepartment } from "../controllers/department.controllers.js"
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
    .patch(updateDepartment)
export default router
