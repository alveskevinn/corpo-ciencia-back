"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_config_1 = __importDefault(require("../config/db.config"));
exports.userService = {
    createUser: async (user) => {
        const hashedPassword = await bcrypt_1.default.hash(user.password, 10);
        const [result] = await db_config_1.default.execute('INSERT INTO users (first_name, last_name, email, password, role, status) VALUES (?, ?, ?, ?, ?, ?)', [user.first_name, user.last_name, user.email, hashedPassword, user.role, user.status]);
        const insertId = result.insertId;
        return exports.userService.getUserById(insertId);
    },
    getAllUsers: async () => {
        const [rows] = await db_config_1.default.execute('SELECT id, first_name, last_name, email, role, status, created_at, updated_at FROM users');
        return rows;
    },
    getUserById: async (id) => {
        const [rows] = await db_config_1.default.execute('SELECT id, first_name, last_name, email, role, status, created_at, updated_at, password FROM users WHERE id = ?', [id]);
        return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
    },
    updateUser: async (id, user) => {
        // Se a senha não for fornecida, definimos como null
        const passwordToUpdate = user.password === undefined ? null : user.password;
        const [result] = await db_config_1.default.execute('UPDATE users SET first_name = ?, last_name = ?, email = ?, role = ?, status = ?, password = COALESCE(?, password), updated_at = CURRENT_TIMESTAMP WHERE id = ?', [user.first_name, user.last_name, user.email, user.role, user.status, passwordToUpdate, id]);
        return exports.userService.getUserById(id);
    },
    deleteUser: async (id) => {
        await db_config_1.default.execute('DELETE FROM users WHERE id = ?', [id]);
    },
    getUserByEmail: async (email) => {
        const [rows] = await db_config_1.default.execute('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
        return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
    }
};
