import { Pool } from 'pg'
import dotenv from 'dotenv'

// Carrega as variáveis do .env
dotenv.config()

// Exibe as variáveis de ambiente para debug
console.log('🔍 Variáveis de ambiente carregadas:')
console.log('DB_USER:', process.env.DB_USER)
console.log('DB_HOST:', process.env.DB_HOST)
console.log('DB_NAME:', process.env.DB_NAME)
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '***' : 'NÃO DEFINIDO')
console.log('DB_PORT:', process.env.DB_PORT)

// Configuração do banco de dados PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'terraform-20250219193740321900000001.czsi2u466pma.us-east-1.rds.amazonaws.com',
  database: process.env.DB_NAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  port: Number(process.env.DB_PORT) || 5432,
})

pool.connect()
  .then(() => console.log('✅ Conectado ao banco de dados!'))
  .catch(err => console.error('❌ Erro ao conectar ao banco:', err))

export default pool
