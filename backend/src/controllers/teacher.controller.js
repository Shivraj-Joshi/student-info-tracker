import { createTeacher, loginTeacher } from "../services/teacher.service.js";

export const register = async (req, res) => {
    try {
        const { name, email, password, phone, subjectId } = req.body
        const adminId = req.user.id //comes from auth middelware
        const result = await createTeacher(name, email, password, phone, subjectId, adminId);
        res.status(201).json(result)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const result = await loginTeacher(email, password);
        res.json(result)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}