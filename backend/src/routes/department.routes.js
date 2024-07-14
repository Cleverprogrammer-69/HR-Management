import { verifyJWT } from "../middlewares/auth.middleware.js"
import { deleteDepartment, getAllDepartments, getOneDepartment, registerDepartment, updateDepartment } from "../controllers/department.controllers.js"
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
    .delete(deleteDepartment)
export default router
