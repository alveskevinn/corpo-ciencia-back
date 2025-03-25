import mysql from 'mysql2/promise' // Importando a versão com Promise do mysql2
import dotenv from 'dotenv'

dotenv.config()

console.log('🔍 Variáveis de ambiente carregadas:')
console.log('DB_USERNAME:', process.env.DB_USERNAME)
console.log('DB_HOST:', process.env.DB_HOST)
console.log('DB_DATABASE:', process.env.DB_DATABASE)
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '***' : 'NÃO DEFINIDO')
console.log('DB_PORT:', process.env.DB_PORT)

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER || 'root', 
  password: process.env.DB_PASSWORD || '', 
  database: process.env.DB_NAME || 'corpoeciencia', 
  port: Number(process.env.DB_PORT) || 3306, 
})

async function connect() {
  try {
    const connection = await pool.getConnection()
    console.log('✅ Conectado ao banco de dados!')
    connection.release() 
  } catch (err) {
    console.error('❌ Erro ao conectar ao banco:', err)
  }
}

connect()

export default pool
