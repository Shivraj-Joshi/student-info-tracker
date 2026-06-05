import { Router } from 'express';
const router = Router();

router.get('/login', () => {
    res.send("Login")
})