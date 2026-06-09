import prisma from "../lib/prisma.js";


//enrolling a student in a subject 
export const enrollStudent = async (studentId, subjectId) => {

    //checking if the student already exists 
    const existing = await prisma.enrollment.findUnique({
        where: {
            studentId_subjectId: {
                studentId, subjectId
            }
        }

    })
    if (existing) {
        throw new Error('Student is already enrolled')
    };

    const enrollment = await prisma.enrollment.create({
        data: {
            studentId,
            subjectId
        }
    })

    return enrollment

}

//get the subjects student is enrolled in
export const getStudentEnrollments = async (studentId) => {

    const enrollments = await prisma.enrollment.findMany({
        where: { studentId },
        include: { subject: true } //pulls the subject details along with enrollments
    })
    return enrollments

}

//get all the students enrolled in a subject 
export const getSubjectEnrollments = async (subjectId) => {

    const enrollments = await prisma.enrollment.findMany({
        where: { subjectId },
        include: { student: { select: { id: true, name: true, email: true, rollNumber: true } } }
    })
    return enrollments

}

//remove a student from a subject
export const removeEnrollment = async (enrollmentId) => {
    const enrollments = await prisma.enrollment.findUnique({
        where: { id: enrollmentId }
    })

    if (!enrollments) {
        throw new Error('Enrollment not found')
    }

    await prisma.enrollment.delete({ where: { id: enrollmentId } })

    return { message: 'student removed successfully' }

}