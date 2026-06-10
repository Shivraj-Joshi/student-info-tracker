import { Router } from "express";
import { authenticate, authorizeRoles } from "../middlewares/auth.middleware.js";
import { grades, studentGrades, subjectGrades } from "../controllers/grade.controller.js";

const router = Router();

router.post('/', authenticate, authorizeRoles('TEACHER'), grades)
router.get('/student', authenticate, authorizeRoles('STUDENT'), studentGrades)
router.get('/subject/:subjectId', authenticate, authorizeRoles('TEACHER', 'ADMIN'), subjectGrades)

export default router