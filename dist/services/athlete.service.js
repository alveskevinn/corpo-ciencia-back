"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AthleteService = void 0;
const db_config_1 = __importDefault(require("../config/db.config"));
exports.AthleteService = {
    create: async ({ firstName, email, status }) => {
        const [result] = await db_config_1.default.execute('INSERT INTO athletes (firstname, email, status) VALUES (?, ?, ?) ', [firstName, email, status]);
        const id = result.insertId;
        return { id, firstName, email, status };
    },
    getAll: async () => {
        const [result] = await db_config_1.default.execute('SELECT * FROM athletes');
        return result;
    },
    findByEmail: async (email) => {
        const [result] = await db_config_1.default.execute('SELECT * FROM athletes WHERE email = ? LIMIT 1', [email]);
        return result.length > 0 ? result[0] : null;
    },
    // Função getAthleteByEmail adicionada
    getAthleteByEmail: async (email) => {
        const [result] = await db_config_1.default.execute('SELECT * FROM athletes WHERE email = ? LIMIT 1', [email]);
        return result.length > 0 ? result[0] : null;
    },
    getByID: async (id) => {
        const [result] = await db_config_1.default.execute('SELECT * FROM athletes WHERE id = ?', [id]);
        return result[0] || null;
    },
    update: async (id, data) => {
        const { firstName, email, status } = data;
        const safeFirstName = firstName !== undefined ? firstName : null;
        const safeEmail = email !== undefined ? email : null;
        const safeStatus = status !== undefined ? status : null;
        const [result] = await db_config_1.default.execute('UPDATE athletes SET firstname = COALESCE(?, firstname), email = COALESCE(?, email), status = COALESCE(?, status) WHERE id = ?', [safeFirstName, safeEmail, safeStatus, id]);
        return result.affectedRows > 0 ? { id, firstName, email, status } : null;
    },
    delete: async (id) => {
        await db_config_1.default.execute('DELETE FROM athletes WHERE id = ?', [id]);
    }
};
