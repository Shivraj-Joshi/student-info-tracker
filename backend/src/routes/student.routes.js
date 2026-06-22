import { Router } from "express";
import { authenticate, authorizeRoles } from "../middlewares/auth.middleware.js";
import { register, login, getAll, remove } from "../controllers/student.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { studentRegisterSchema, loginSchema } from "../validator/auth.validator.js";
import rateLimit from "express-rate-limit";
const router = Router();
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 10,
    message: { message: "Too many login attempts, please try again after sometime" }
})

router.post('/register', authLimiter, validate(studentRegisterSchema), register)
router.post('/login', authLimiter, validate(loginSchema), login)
router.get('/', authenticate, authorizeRoles('ADMIN'), getAll)
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), remove)

export default router