import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET não está definido');
}

export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token de autenticação não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

        req.user = decoded; 
        
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Token inválido ou expirado' });
    }
};
