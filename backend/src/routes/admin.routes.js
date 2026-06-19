import { Router } from 'express'
import { login } from '../controllers/admin.controller.js'
import rateLimit from 'express-rate-limit';

const router = Router();

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 10,
    message: { message: "Too many login attempts, please try again after sometime" }
})

router.post('/login', authLimiter, login)

export default router