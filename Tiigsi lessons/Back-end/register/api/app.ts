import express from 'express'
const app = express()
import authoRouter from './routes/autho.route'
import dotenv from 'dotenv'
dotenv.config()

app.use(express.json())

const PORT = process.env.PORT

app.use('/api/autho', authoRouter)

app.listen(PORT, () => console.log(`Surver is running on ${PORT}`))