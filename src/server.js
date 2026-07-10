import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDatabase } from './config/database.js'
import userRoutes from './routes/user.js'
import goalRoutes from './routes/goals.js'
import calculationRoutes from './routes/calculations.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: [
    'http://localhost:5173',
    
    'https://munimji-git-main-rproject-29s-projects.vercel.app',

    'https://munimji-i6j5q0fd2-rproject-29s-projects.vercel.app',
  ],
  credentials: true,
}))
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    message: '✅ MunimJi API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  })
})

app.use('/api/user', userRoutes)
app.use('/api/goals', goalRoutes)
app.use('/api/calculations', calculationRoutes)

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong' })
})

async function startServer() {
  await connectDatabase()
  app.listen(PORT, () => {
    console.log(`🚀 MunimJi backend running on port ${PORT}`)
    console.log(`📡 API: http://localhost:${PORT}`)
  })
}

startServer()