import { markAttendance, getStudentAttendance, getSubjectAttendance } from "../services/attandance.service.js";

export const attendance = async (req, res) => {
    try {
        const { studentId, subjectId, date, status } = req.body
        const teacherId = req.user.id
        const result = await markAttendance(studentId, subjectId, teacherId, date, status)
        res.status(201).json(result)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const studentAttendace = async (req, res) => {
    try {
        const studentId = req.user.id
        const result = await getStudentAttendance(studentId)
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const subjectAttendance = async (req, res) => {
    try {
        const subjectId = parseInt(req.params.subjectId)
        const result = await getSubjectAttendance(subjectId)
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}