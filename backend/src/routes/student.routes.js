import { Router } from "express";
import { authenticate, authorizeRoles } from "../middlewares/auth.middleware.js";
import { register, login, getAll } from "../controllers/student.controller.js";
const router = Router();

router.post('/register', register)
router.post('/login', login)
router.get('/', authenticate, authorizeRoles('ADMIN'), getAll)

export default router