import { Router } from "express";
import { add, remove, allSubject } from "../controllers/subject.controller.js";
import { authenticate, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = Router()

router.get('/', authenticate, authorizeRoles('ADMIN'), allSubject)
router.post('/', authenticate, authorizeRoles('ADMIN'), add)
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), remove)

export default router