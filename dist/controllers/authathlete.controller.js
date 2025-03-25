"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authathleteController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const athlete_service_1 = require("../services/athlete.service");
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET não está definido no .env');
}
exports.authathleteController = {
    login: async (req, res) => {
        const { email } = req.body;
        try {
            const athlete = await athlete_service_1.AthleteService.getAthleteByEmail(email);
            if (!athlete) {
                return res.status(404).json({ error: 'Atleta não encontrado' });
            }
            const token = jsonwebtoken_1.default.sign({
                id: athlete.id,
                email: athlete.email,
                first_name: athlete.firstName,
            }, JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ token });
        }
        catch (err) {
            console.error('Erro ao fazer login:', err);
            return res.status(500).json({ error: 'Erro ao fazer login' });
        }
    }
};
