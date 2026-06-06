import express from 'express'
import helmet from 'helmet'

const app = express()
const PORT = process.env.PORT || 3000

app.use(helmet())
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: 'Hello World' })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})