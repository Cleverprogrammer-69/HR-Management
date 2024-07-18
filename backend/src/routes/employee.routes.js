import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  getOneEmployee,
  updateEmployee,
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
  .patch(updateEmployee)
  .delete(deleteEmployee);

export default router;
