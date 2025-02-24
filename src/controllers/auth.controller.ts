import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { userService } from '../services/user.service';
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET;

export const authController = {
    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await userService.getUserByEmail(email);
            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ error: 'Senha inválida' });
            }

            const token = jwt.sign(
                { id: user.id, email: user.email, role: user.role },
                JWT_SECRET,
                { expiresIn: '1h' } 
            );

            return res.status(200).json({ token });
        } catch (err) {
            return res.status(500).json({ error: 'Erro ao fazer login' });
        }
    }
};
