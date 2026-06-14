import prisma from "../lib/prisma.js";

export const addSubject = async (name) => {
    const existing = await prisma.subject.findUnique({
        where: { name }
    })
    if (existing) {
        throw new Error('Subject already exists')
    }

    const newSubject = await prisma.subject.create({
        data: {
            name
        }
    })
    return newSubject
}


export const deleteSubject = async (id) => {
    const subject = await prisma.subject.findUnique({
        where: { id }
    })
    if (!subject) {
        throw new Error('Subject not found')
    }
    await prisma.subject.delete({ where: { id } });
    return { message: 'Subject Deleted Successfully' }

}

export const getAllSubjects = async () => {
    return await prisma.subject.findMany()
}