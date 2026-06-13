import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import prisma from "../lib/prisma.js";

//Registering the teacher , only  admin can do it

export const createTeacher = async (name, email, password, phone, subjectId, adminId) => {

    //check if the teacher alreaady exist in the databse

    const existingTeacher = await prisma.teacher.findUnique({
        where: { email }
    })

    //if existing teacher then return a message 
    if (existingTeacher) {
        throw new Error("Teacher with this email already exists")
    }

    // hasshing the password 

    const hashedPassword = await bcrypt.hash(password, 10);

    const teacher = await prisma.teacher.create({
        data: {
            name,
            email,
            password: hashedPassword,
            phone,
            subjectId,
            adminId
        }
    })
    return { id: teacher.id, name: teacher.name, email: teacher.email, }


}

//Login functionality for teachers

export const loginTeacher = async (email, password) => {

    //finding the teacher in database
    const teacher = await prisma.teacher.findUnique({
        where: { email }
    })

    //if not found
    if (!teacher) {
        throw new Error('Invalid Credentials');
    }

    //comparing the password with the actual password

    const isMatch = await bcrypt.compare(password, teacher.password)

    if (!isMatch) {
        throw new Error('Invalid Credentials')
    }

    const token = jwt.sign({
        id: teacher.id,
        role: 'TEACHER'
    }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })

    return { token, name: teacher.name, email: teacher.email }

}

export const getAllTeachers = async () => {
    return await prisma.teacher.findMany({
        select: { id: true, name: true, email: true, phone: true }
    })
}

export const deleteTeacher = async (id) => {
    const teacher = await prisma.teacher.findUnique({ where: { id } })
    if (!teacher) throw new Error('Teacher not found')
    await prisma.teacher.delete({ where: { id } })
    return { message: 'Teacher removed successfully' }
}
export const getAllSubjects = async () => {
    return await prisma.subject.findMany()
}