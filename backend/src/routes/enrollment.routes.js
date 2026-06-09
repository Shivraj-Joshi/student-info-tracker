import { Router } from "express";
import { enrollment, studentEnrollment, subjectEnrollment, removeStudentEnrollment } from "../controllers/enrollments.controller.js";
import { authenticate, authorizeRoles } from '../middlewares/auth.middleware.js'


const router = Router();

router.post('/', authenticate, authorizeRoles('TEACHER', 'ADMIN'), enrollment)
router.get('/student', authenticate, authorizeRoles('STUDENT'), studentEnrollment)
router.get('/subject/:subjectId', authenticate, authorizeRoles('TEACHER', 'ADMIN'), subjectEnrollment)
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), removeStudentEnrollment)

export default router