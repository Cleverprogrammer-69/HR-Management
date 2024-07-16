import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createJobNature,
  deleteJobNature,
  getAllJobNatures,
  getOneJobNature,
  updateJobNature,
} from "../controllers/jobNature.controllers.js";
const router = Router();

router.use(verifyJWT);

router
    .route("/")
    .post(createJobNature)
    .get(getAllJobNatures);

router
  .route("/:jobNatureId")
  .get(getOneJobNature)
  .patch(updateJobNature)
  .delete(deleteJobNature);

export default router;
