import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createEmployee,
  getAllEmployees,
//   deleteJobType,
//   getAllJobTypes,
  getOneEmployee,
//   updateJobType,
} from "../controllers/employee.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router.use(verifyJWT);

router
    .route("/")
    .post(upload.single("image"), createEmployee)
    .get(getAllEmployees);

router
  .route("/:employeeId")
  .get(getOneEmployee)
//   .patch(updateJobType)
//   .delete(deleteJobType);

export default router;
