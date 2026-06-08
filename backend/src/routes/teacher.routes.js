import { Router } from 'express';
import { register, login } from '../controllers/teacher.controller.js';
import { authenticate, authorizeRoles } from '../middlewares/auth.middleware.js'

const router = Router();

router.post('/register', authenticate, authorizeRoles('ADMIN'), register)
router.post('/login', login)


export default router





