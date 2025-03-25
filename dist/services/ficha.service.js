"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = __importDefault(require("../config/db.config"));
class FichaService {
    async createFicha(athleteId, planFileUrl = '', progressFileUrl) {
        try {
            const [result] = await db_config_1.default.execute('INSERT INTO fichas (athlete_id, plan_file_url, progress_file_url, created_at) VALUES (?, ?, ?, NOW())', [athleteId, planFileUrl, progressFileUrl]);
            const insertId = result.insertId;
            return this.getFichaById(insertId);
        }
        catch (err) {
            console.error('Erro ao criar ficha:', err);
            throw new Error('Erro ao criar ficha');
        }
    }
    async getAllFichas() {
        try {
            const [rows] = await db_config_1.default.execute('SELECT * FROM fichas');
            return rows;
        }
        catch (err) {
            console.error('Erro ao obter todas as fichas:', err);
            throw new Error('Erro ao obter todas as fichas');
        }
    }
    async getFichaById(id) {
        try {
            const [rows] = await db_config_1.default.execute('SELECT * FROM fichas WHERE id = ?', [id]);
            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
        }
        catch (err) {
            console.error('Erro ao obter ficha por ID:', err);
            throw new Error('Erro ao obter ficha por ID');
        }
    }
    async deleteFicha(id) {
        try {
            const [result] = await db_config_1.default.execute('DELETE FROM fichas WHERE id = ?', [id]);
            const affectedRows = result.affectedRows;
            return affectedRows > 0;
        }
        catch (err) {
            console.error('Erro ao deletar ficha:', err);
            throw new Error('Erro ao deletar ficha');
        }
    }
}
exports.default = new FichaService();
