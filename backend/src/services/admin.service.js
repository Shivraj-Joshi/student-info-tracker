import prisma from '../lib/prisma.js'
import bycrpt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const adminLogin = async (email, password) => {

    //Find admin by its email
    const admin = await prisma.admin.findUnique({
        where: { email }
    })

    if (!admin) {
        throw new Error('Invalid Cridentials')

    }

    //Comparing  the entered password to the admin's hashed password in database
    const isMatch = await bycrpt.compare(password, admin.password)

    if (!isMatch) {
        throw new Error('Invalid Cridentials')
    }

    //creating jwt token with id and role inside
    const token = jwt.sign({
        id: admin.id,
        role: 'Admin'
    }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1d'
    })

    return { token, name: admin.name, email: admin.email }
}