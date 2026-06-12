import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import adminRoutes from './routes/admin.routes.js'
import teacherRoutes from './routes/teacher.routes.js'
import studentRoutes from './routes/student.routes.js'
import enrollmentRoutes from './routes/enrollment.routes.js'
import attendanceRoutes from './routes/attendance.routes.js'
import gradeRoutes from './routes/grade.routes.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(helmet())
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173"
}))
app.use('/api/admin', adminRoutes)
app.use('/api/teacher', teacherRoutes)
app.use('/api/student', studentRoutes)
app.use('/api/enrollment', enrollmentRoutes)
app.use('/api/attendance', attendanceRoutes)
app.use('/api/grade', gradeRoutes)

app.get('/', (req, res) => {
    res.json({ message: 'Hello students' })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})