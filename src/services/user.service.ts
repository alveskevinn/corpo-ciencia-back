import bcrypt from 'bcrypt';
import pool from '../config/db.config';
import { User } from '../models/user.model';

export const userService = {
    createUser: async (user: User): Promise<any> => {
        const hashedPassword = await bcrypt.hash(user.password, 10);

        const [result] = await pool.execute(
            'INSERT INTO users (first_name, last_name, email, password, role, status) VALUES (?, ?, ?, ?, ?, ?)',
            [user.first_name, user.last_name, user.email, hashedPassword, user.role, user.status]
        );

        const insertId = (result as any).insertId;
        return userService.getUserById(insertId);
    },

    getAllUsers: async (): Promise<User[]> => {
        const [rows] = await pool.execute('SELECT id, first_name, last_name, email, role, status, created_at, updated_at FROM users');
        return rows as User[]; 
    },

    getUserById: async (id: number): Promise<User | null> => {
        const [rows] = await pool.execute(
            'SELECT id, first_name, last_name, email, role, status, created_at, updated_at, password FROM users WHERE id = ?',
            [id]
        );
        return Array.isArray(rows) && rows.length > 0 ? rows[0] as User : null;
    },
   
    updateUser: async (id: number, user: Partial<User>): Promise<User | null> => {
                // Se a senha não for fornecida, definimos como null
        const passwordToUpdate = user.password === undefined ? null : user.password;

        const [result] = await pool.execute(
            'UPDATE users SET first_name = ?, last_name = ?, email = ?, role = ?, status = ?, password = COALESCE(?, password), updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [user.first_name, user.last_name, user.email, user.role, user.status, passwordToUpdate, id]
        );

        return userService.getUserById(id);
    },

    deleteUser: async (id: number): Promise<void> => {
        await pool.execute('DELETE FROM users WHERE id = ?', [id]);
    },

    getUserByEmail: async (email: string): Promise<User | null> => {
        const [rows] = await pool.execute('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
        return Array.isArray(rows) && rows.length > 0 ? rows[0] as User : null;
    }
};
