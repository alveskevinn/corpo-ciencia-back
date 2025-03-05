import { Request, Response, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { AthleteService } from '../services/athlete.service';

const JWT_SECRET = process.env.JWT_SECRET;

export const authathleteController = {
    login: async (req, res) => {
        const { email } = req.body;

        try {
            const athlete = await AthleteService.getAthleteByEmail(email); 
            if (!athlete) {
                return res.status(404).json({ error: 'Atleta não encontrado' });
            }

            // Geração do token sem a necessidade de senha
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
            return res.status(500).json({ error: 'Erro ao fazer login' });
        }
    }
} as const;  // Adding this line to assert the controller is of the correct type
