import express from 'express'
import helmet from 'helmet'

const app = express()

app.use(helmet())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})