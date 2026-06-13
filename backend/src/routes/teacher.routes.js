import { Router } from 'express';
import { register, login, getAll, remove, getSubjects } from '../controllers/teacher.controller.js';
import { authenticate, authorizeRoles } from '../middlewares/auth.middleware.js'

const router = Router();

router.post('/register', authenticate, authorizeRoles('ADMIN'), register)
router.post('/login', login)
router.get('/', authenticate, authorizeRoles('ADMIN'), getAll)
router.get('/subjects', authenticate, authorizeRoles('ADMIN'), getSubjects)
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), remove)

export default router





