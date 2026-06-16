import { createStudent, loginStudent, getAllStudent } from "../services/student.service.js";

export const register = async (req, res) => {
    try {
        const { name, email, password, rollNumber, phone, class: Class, dob } = req.body
        console.log({ name, email, password, rollNumber, phone, Class, dob })
        const result = await createStudent(name, email, password, rollNumber, phone, Class, dob)
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const result = await loginStudent(email, password)
        res.json(result)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const getAll = async (req, res) => {
    try {
        const result = await getAllStudent()
        res.json(result)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}