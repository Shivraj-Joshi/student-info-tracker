import prisma from "../lib/prisma.js";

// makring attandance of the student 
export const markAttendance = async (studentId, subjectId, teacherId, date, status) => {

    // check if teacher's subject id matches with the subject id 

    const teacher = await prisma.teacher.findUnique({
        where: { id: teacherId }
    })

    if (teacher.subjectId !== subjectId) {
        throw new Error('You can only record attendance for your own subject')
    }
    //checking if attandace is already marked 

    const alreadyMarked = await prisma.attendance.findUnique({
        where: {
            studentId_subjectId_date: { studentId, subjectId, date: new Date(date) }
        }
    })

    if (alreadyMarked) {
        throw new Error('Already Marked for this student !')
    }

    const attendance = await prisma.attendance.create({
        data: {
            studentId,
            subjectId,
            teacherId,
            date: new Date(date),
            status
        }
    })
    return attendance
}

//gets all attendance records for a student

export const getStudentAttendance = async (studentId) => {
    const attendance = await prisma.attendance.findMany({
        where: { studentId },
        include: { subject: true }
    })
    return attendance
}

//gets all attendance records for a subject

export const getSubjectAttendance = async (subjectId) => {
    const attendance = await prisma.attendance.findMany({
        where: {
            subjectId
        },
        include: {
            student: { select: { id: true, name: true, rollNumber: true } }
        }
    })
    return attendance
}