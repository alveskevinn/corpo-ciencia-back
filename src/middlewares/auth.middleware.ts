import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ error: 'Token de autenticação não fornecido' });
    }

    try {
        if (!JWT_SECRET) {
            return res.status(500).json({ error: 'JWT_SECRET não configurado no ambiente' });
        }
        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = decoded; 
        
        next(); 
    } catch (err) {
        return res.status(401).json({ error: 'Token inválido ou expirado' });
    }
};
