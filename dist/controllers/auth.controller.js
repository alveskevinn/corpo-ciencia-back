"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_service_1 = require("../services/user.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET não está definido no .env');
}
exports.authController = {
    login: async (req, res) => {
        const { email, password } = req.body;
        console.log('Tentativa de login com e-mail:', email);
        try {
            const user = await user_service_1.userService.getUserByEmail(email);
            if (!user) {
                console.warn(`Usuário não encontrado: ${email}`);
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            console.log('Usuário encontrado:', user.email);
            if (!user.password) {
                console.error(`Senha não encontrada para o usuário ${email}`);
                return res.status(500).json({ error: 'Erro interno no servidor' });
            }
            const validPassword = await bcrypt_1.default.compare(password, user.password);
            if (!validPassword) {
                console.warn(`Senha inválida para o usuário ${email}`);
                return res.status(400).json({ error: 'Senha inválida' });
            }
            console.log(`Senha válida para o usuário ${email}`);
            try {
                const token = jsonwebtoken_1.default.sign({
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    first_name: user.first_name,
                    last_name: user.last_name
                }, JWT_SECRET, { expiresIn: '1h' });
                console.log(`Token gerado para ${email}`);
                return res.status(200).json({ token });
            }
            catch (tokenError) {
                console.error('Erro ao gerar token:', tokenError);
                return res.status(500).json({ error: 'Erro ao gerar token' });
            }
        }
        catch (err) {
            console.error('Erro ao fazer login:', err);
            return res.status(500).json({ error: 'Erro ao fazer login' });
        }
    }
};
