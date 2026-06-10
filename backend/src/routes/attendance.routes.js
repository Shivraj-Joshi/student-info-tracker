import { Router } from "express";
import { authenticate, authorizeRoles } from '../middlewares/auth.middleware.js'
import { attendance, studentAttendace, subjectAttendance } from "../controllers/attandance.controller.js";


const router = Router();

router.post('/', authenticate, authorizeRoles('TEACHER'), attendance)
router.get('/student', authenticate, authorizeRoles('STUDENT'), studentAttendace)
router.get('/subject/:subjectId', authenticate, authorizeRoles('TEACHER', 'ADMIN'), subjectAttendance)

export default router