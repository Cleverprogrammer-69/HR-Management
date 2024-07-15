import { Router } from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import {createJobType} from '../controllers/jobType.controllers.js'
const router = Router()

router.use(verifyJWT)

router.route("/").post(createJobType)

export default router