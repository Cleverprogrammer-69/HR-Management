import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  deleteDesignation,
  getAllDesignations,
  getOneDesignation,
  createDesignation,
  updateDesignation,
} from "../controllers/designation.controllers.js";
import { Router } from "express";
const router = Router();

router.use(verifyJWT);

router
    .route("/")
    .post(createDesignation)
    .get(getAllDesignations);

router
  .route("/:designationId")
  .get(getOneDesignation)
  .patch(updateDesignation)
  .delete(deleteDesignation);
export default router;
