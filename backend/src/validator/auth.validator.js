import * as z from "zod";

export const studentRegisterSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid Email Address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    rollNumber: z.string().min(1, 'rollnumber is requrired'),
    phone: z.string().optional(),
    class: z.string().min(1, 'class is required'),
    dob: z.string().optional()
})
export const teacherRegisterSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid Email Address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    phone: z.string().optional(),
    subjectId: z.number({ message: 'Subject ID must be a number' })
})
export const loginSchema = z.object({
    email: z.string().email('Invalid Email Address'),
    password: z.string().min(1, 'Password required'),
})