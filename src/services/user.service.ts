import bcrypt from 'bcrypt';
import pool from '../config/db.config';
import { User } from '../models/user.model';

export const userService = {
    createUser: async (user: User): Promise<User> => {
        // Gerando o hash da senha antes de salvar
        const hashedPassword = await bcrypt.hash(user.password, 10);

        const result = await pool.query(
            'INSERT INTO users (first_name, last_name, email, password, role, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [user.first_name, user.last_name, user.email, hashedPassword, user.role, user.status]
        );
        
        return result.rows[0];
    },

    getAllUsers: async (): Promise<User[]> => {
        const result = await pool.query('SELECT id, first_name, last_name, email, role, status, created_at, updated_at FROM users');
        return result.rows;
    },

    getUserById: async (id: number): Promise<User | null> => {
        const result = await pool.query(
            'SELECT id, first_name, last_name, email, role, status, created_at, updated_at FROM users WHERE id = $1',
            [id]
        );
        return result.rows[0] || null;
    },

    updateUser: async (id: number, user: Partial<User>): Promise<User | null> => {
        let hashedPassword = user.password ? await bcrypt.hash(user.password, 10) : undefined;

        const result = await pool.query(
            'UPDATE users SET first_name = $1, last_name = $2, email = $3, role = $4, status = $5, password = COALESCE($6, password), updated_at = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *',
            [user.first_name, user.last_name, user.email, user.role, user.status, hashedPassword, id]
        );

        return result.rows[0] || null;
    },

    deleteUser: async (id: number): Promise<void> => {
        await pool.query('DELETE FROM users WHERE id = $1', [id]);
    }
};
