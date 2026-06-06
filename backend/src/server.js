import express from 'express'
import helmet from 'helmet'
import adminRoutes from './routes/admin.routes.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(helmet())
app.use(express.json())
app.use('/api/admin', adminRoutes)

app.get('/', (req, res) => {
    res.json({ message: 'Hello World' })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})