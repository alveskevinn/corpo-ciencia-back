// import express from 'express'
// import cors from 'cors'
// import dotenv from 'dotenv'
// import athleteRoutes from './routes/athlete.routes'

// dotenv.config()

// const app = express()

// app.use(cors())
// app.use(express.json())

// app.use('/athletes', athleteRoutes)

// app.get('/', (req, res) => {
//   res.send('API funcionando!')
// })

// const PORT = process.env.PORT || 3000
// app.listen(PORT, () => {
//   console.log(`Servidor rodando na porta ${PORT}`)
// })


import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { Client } from 'pg'
import athleteRoutes from './routes/athlete.routes'  

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
})

client.connect()
  .then(() => console.log('Conectado ao banco de dados PostgreSQL'))
  .catch((err) => console.error('Erro de conexão com o banco de dados:', err.stack))

app.get('/', (req, res) => {
  res.send('API funcionando!')
})

app.use('/athletes', athleteRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
