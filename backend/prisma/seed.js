import { PrismaClient } from '@prisma/client'
import bycrpt from 'bcryptjs'


const prisma = new PrismaClient()

async function main() {

    //hashing the password

    const hashedPassword = await bycrpt.hash(process.env.ADMIN_PASSWORD, 10);

    //creating the admin in the database

    const admin = await prisma.admin.upsert({
        where: { email: process.env.ADMIN_EMAIL },
        update: {},
        create: {
            name: 'Super Admin',
            email: process.env.ADMIN_EMAIL,
            password: hashedPassword
        },

    })
    // console.log('Admin seeded : ', admin.email)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {

        await prisma.$disconnect()
    })