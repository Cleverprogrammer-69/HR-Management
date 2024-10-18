import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createSalary, getOneSalary, updateSalary } from "../controllers/salary.controllers.js";
const router = Router()

router.use(verifyJWT)

router
    .route("/")
    .post(createSalary)

router
    .route("/:employeeId")
    .get(getOneSalary)
    .patch(updateSalary)

export default router