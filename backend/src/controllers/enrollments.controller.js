import { enrollStudent, getStudentEnrollments, getSubjectEnrollments, removeEnrollment } from "../services/enrollment.service.js";

export const enrollment = async (req, res) => {
    try {
        const { studentId, subjectId } = req.body
        // console.log('student id: ', studentId)
        // console.log('subject id: ', subjectId)
        const result = await enrollStudent(studentId, subjectId)
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const studentEnrollment = async (req, res) => {
    try {
        const studentId = req.user.id //getting studentId from the url's request params
        const result = await getStudentEnrollments(studentId)
        res.json(result)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const subjectEnrollment = async (req, res) => {
    try {
        const subjectId = parseInt(req.params.subjectId) //getting subjectId from the url's request params
        const result = await getSubjectEnrollments(subjectId)
        res.json(result)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const removeStudentEnrollment = async (req, res) => {
    try {
        const enrollmentId = parseInt(req.params.id)
        const result = await removeEnrollment(enrollmentId)
        res.json(result)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}