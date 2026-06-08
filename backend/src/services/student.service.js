import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import prisma from '../lib/prisma.js'


//registering the student
export const createStudent = async (name, email, password, rollNumber, phone, Class, dob) => {

    //checking if student already exist 
    const existingStudent = await prisma.student.findUnique({
        where: {
            email
        }
    })

    if (existingStudent) {
        throw new Error('Student with this email alreaddy exist')
    }

    //hasshing password
    const hashedPassword = await bcrypt.hash(password, 10)

    const student = await prisma.student.create({
        data: {
            name,
            email,
            password: hashedPassword,
            rollNumber,
            phone,
            class: Class,
            dob: dob ? new Date(dob) : null
        }
    })

    return { id: student.id, name: student.name, email: student.email }

}

//logging in the student

export const loginStudent = async (email, password) => {

    //checking whether the student exist or not
    const student = await prisma.student.findUnique({
        where: { email }
    })

    if (!student) {
        throw new Error('No Student with this email exist')
    }

    //comparing student password with the hashed password
    const isMatch = await bcrypt.compare(password, student.password)

    if (!isMatch) {
        throw new Error('Invalid Cridentials')
    }

    //generating jwt token for student
    const token = jwt.sign({ id: student.id, role: 'STUDENT' }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })

    return { token, name: student.name, email: student.email }

}