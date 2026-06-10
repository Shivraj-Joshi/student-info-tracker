import prisma from "../lib/prisma.js";

export const recordGrade = async (studentId, subjectId, teacherId, score, remarks) => {

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
    const grade = await prisma.grade.findMany({
        where: {
            studentId
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