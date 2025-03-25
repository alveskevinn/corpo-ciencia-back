import { Request, Response, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { AthleteService } from '../services/athlete.service';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET não está definido no .env');
}

export const authathleteController = {
    login: async (req: any, res: any): Promise<Response> => {
        const { email } = req.body;

        try {
            const athlete = await AthleteService.getAthleteByEmail(email);
            if (!athlete) {
                return res.status(404).json({ error: 'Atleta não encontrado' });
            }

            const token = jwt.sign(
                { 
                    id: athlete.id, 
                    email: athlete.email,
                    first_name: athlete.firstName,
                },
                JWT_SECRET,
                { expiresIn: '1h' }
            );

            return res.status(200).json({ token });
        } catch (err) {
            console.error('Erro ao fazer login:', err);
            return res.status(500).json({ error: 'Erro ao fazer login' });
        }
    }
} as const;
