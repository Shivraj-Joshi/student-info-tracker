import { Router } from "express";
import { authenticate, authorizeRoles } from "../middlewares/auth.middleware.js";
import { register, login, getAll, remove } from "../controllers/student.controller.js";
import rateLimit from "express-rate-limit";
const router = Router();
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 10,
    message: { message: "Too many login attempts, please try again after sometime" }
})

router.post('/register', authLimiter, register)
router.post('/login', authLimiter, login)
router.get('/', authenticate, authorizeRoles('ADMIN'), getAll)
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), remove)

export default router