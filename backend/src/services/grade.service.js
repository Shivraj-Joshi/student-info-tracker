import prisma from "../lib/prisma.js";

export const recordGrade = async (studentId, subjectId, teacherId, score, remarks) => {

    //check if the subject id matches with the teacher's id 

    const teacher = await prisma.teacher.findUnique({
        where: { id: teacherId }
    })
    if (teacher.subjectId !== subjectId) {
        throw new Error('You can only record grades for your own subject')
    }

    // upsert checks if grades exist and if they do than update it and if they won't it will create 
    const grade = await prisma.grade.upsert({
        where: {
            studentId_subjectId: { studentId, subjectId }
        },
        update: { score, remarks, teacherId },
        create: { studentId, subjectId, teacherId, score, remarks }
    })
    return grade
}

export const getStudentGrades = async (studentId) => {

    const enrollments = await prisma.enrollment.findMany({
        where: {
            studentId,
        },
        select: { subjectId: true }
    })

    const enrolledSubjectIds = enrollments.map(e => e.subjectId)

    const grade = await prisma.grade.findMany({
        where: {
            studentId,
            subjectId: { in: enrolledSubjectIds }
        },
        include: { subject: true } // shows which subject the grade is for
    })
    return grade
}
export const getSubjectGrades = async (subjectId) => {
    const grade = await prisma.grade.findMany({
        where: {
            subjectId
        },
        include: {
            student: { select: { id: true, name: true, rollNumber: true } }  //shows which student
        }
    })
    return grade
}