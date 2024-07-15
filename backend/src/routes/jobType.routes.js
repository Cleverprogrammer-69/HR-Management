import { Router } from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import {createJobType, deleteJobType, getAllJobTypes, getOneJobType, updateJobType} from '../controllers/jobType.controllers.js'
const router = Router()

router.use(verifyJWT)

router  
    .route("/")
    .post(createJobType)
    .get(getAllJobTypes)

router
    .route("/:jobTypeId")
    .get(getOneJobType)    
    .patch(updateJobType)
    .delete(deleteJobType)
    
export default router