import { recordGrade, getStudentGrades, getSubjectGrades } from "../services/grade.service.js";

export const grades = async (req, res) => {

    try {
        const { studentId, subjectId, score, remarks } = req.body
        const teacherId = req.user.id
        const result = await recordGrade(studentId, subjectId, teacherId, score, remarks)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
export const studentGrades = async (req, res) => {
    try {
        const studentId = req.user.id
        const result = await getStudentGrades(studentId)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
export const subjectGrades = async (req, res) => {
    try {
        const subjectId = parseInt(req.params.subjectId)
        const result = await getSubjectGrades(subjectId)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}