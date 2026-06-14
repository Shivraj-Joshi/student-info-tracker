import { addSubject, deleteSubject, getAllSubjects } from "../services/subject.service.js";

export const add = async (req, res) => {
    try {
        const { name } = req.body
        const result = await addSubject(name)
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const remove = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const result = await deleteSubject(id)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const allSubject = async (req, res) => {
    try {
        const result = await getAllSubjects()
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
} 