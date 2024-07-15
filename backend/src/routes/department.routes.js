import { verifyJWT } from "../middlewares/auth.middleware.js"
import { deleteDepartment, getAllDepartments, getOneDepartment, createDepartment, updateDepartment } from "../controllers/department.controllers.js"
import { Router } from "express"
const router = Router()

router.use(verifyJWT)

router
    .route("/")
    .post(createDepartment)
    .get(getAllDepartments)

router
    .route("/:departmentId")
    .get(getOneDepartment)
    .patch(updateDepartment)
    .delete(deleteDepartment)
export default router
