import { Router } from "express";
import { authenticate, authorizeRoles } from "../middlewares/auth.middleware.js";
import { register, login, getAll, remove } from "../controllers/student.controller.js";
const router = Router();

router.post('/register', register)
router.post('/login', login)
router.get('/', authenticate, authorizeRoles('ADMIN'), getAll)
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), remove)

export default router