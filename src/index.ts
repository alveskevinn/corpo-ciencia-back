import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import athleteRoutes from './routes/athlete.routes'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/athletes', athleteRoutes)

app.get('/', (req, res) => {
  res.send('API funcionando!')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
