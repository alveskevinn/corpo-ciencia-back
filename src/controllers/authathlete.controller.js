"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authathleteController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const athlete_service_1 = require("../services/athlete.service");
const JWT_SECRET = process.env.JWT_SECRET;
exports.authathleteController = {
    login: async (req, res) => {
        const { email } = req.body;
        try {
            const athlete = await athlete_service_1.AthleteService.getAthleteByEmail(email);
            if (!athlete) {
                return res.status(404).json({ error: 'Atleta não encontrado' });
            }
            // Geração do token sem a necessidade de senha
            const token = jsonwebtoken_1.default.sign({
                id: athlete.id,
                email: athlete.email,
                first_name: athlete.firstName,
            }, JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ token });
        }
        catch (err) {
            return res.status(500).json({ error: 'Erro ao fazer login' });
        }
    }
}; // Adding this line to assert the controller is of the correct type
