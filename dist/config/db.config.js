"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise")); // Importando a versão com Promise do mysql2
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log('🔍 Variáveis de ambiente carregadas:');
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '***' : 'NÃO DEFINIDO');
console.log('DB_PORT:', process.env.DB_PORT);
const pool = promise_1.default.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'corpoeciencia',
    port: Number(process.env.DB_PORT) || 3306,
});
async function connect() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Conectado ao banco de dados!');
        connection.release();
    }
    catch (err) {
        console.error('❌ Erro ao conectar ao banco:', err);
    }
}
connect();
exports.default = pool;
