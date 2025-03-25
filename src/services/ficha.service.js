"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = __importDefault(require("../config/db.config"));
class FichaService {
    async createFicha(athleteId, planFileUrl = '', progressFileUrl) {
        const [result] = await db_config_1.default.execute('INSERT INTO fichas (athlete_id, plan_file_url, progress_file_url, created_at) VALUES (?, ?, ?, NOW())', [athleteId, planFileUrl, progressFileUrl]);
        const insertId = result.insertId;
        return this.getFichaById(insertId);
    }
    async getAllFichas() {
        const [rows] = await db_config_1.default.execute('SELECT * FROM fichas');
        return rows;
    }
    async getFichaById(id) {
        const [rows] = await db_config_1.default.execute('SELECT * FROM fichas WHERE id = ?', [id]);
        return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
    }
    async deleteFicha(id) {
        const [result] = await db_config_1.default.execute('DELETE FROM fichas WHERE id = ?', [id]);
        const affectedRows = result.affectedRows;
        return affectedRows > 0;
    }
}
exports.default = new FichaService();
