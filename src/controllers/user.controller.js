"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("../services/user.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.userController = {
    createUser: async (req, res) => {
        const user = req.body;
        if (!user.password) {
            res.status(400).json({ error: "Password is required" });
            return;
        }
        try {
            const newUser = await user_service_1.userService.createUser(user);
            res.status(201).json({ ...newUser, password: undefined });
        }
        catch (err) {
            res.status(500).json({ error: 'Error creating user' });
        }
    },
    getAllUsers: async (_req, res) => {
        try {
            const users = await user_service_1.userService.getAllUsers();
            res.status(200).json(users);
        }
        catch (err) {
            res.status(500).json({ error: 'Error fetching users' });
        }
    },
    getUserById: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await user_service_1.userService.getUserById(Number(id));
            if (user) {
                res.status(200).json(user);
            }
            else {
                res.status(404).json({ error: 'User not found' });
            }
        }
        catch (err) {
            res.status(500).json({ error: 'Error fetching user' });
        }
    },
    updateUser: async (req, res) => {
        const { id } = req.params;
        const userUpdates = req.body;
        const { currentPassword } = req.body;
        try {
            const user = await user_service_1.userService.getUserById(Number(id));
            if (!user) {
                res.status(404).json({ error: 'Usuário não encontrado' });
                return;
            }
            if (currentPassword) {
                const validPassword = await bcrypt_1.default.compare(currentPassword, user.password);
                if (!validPassword) {
                    res.status(400).json({ error: 'Senha atual inválida' });
                    return;
                }
            }
            let hashedPassword = userUpdates.password ? await bcrypt_1.default.hash(userUpdates.password, 10) : undefined;
            const updatedUser = await user_service_1.userService.updateUser(Number(id), {
                ...userUpdates,
                password: hashedPassword,
            });
            if (updatedUser) {
                res.status(200).json({ ...updatedUser, password: undefined });
            }
            else {
                res.status(404).json({ error: 'User not found' });
            }
        }
        catch (err) {
            console.error('Error updating user:', err);
            res.status(500).json({ error: 'Error updating user', details: err });
        }
    },
    deleteUser: async (req, res) => {
        const { id } = req.params;
        try {
            await user_service_1.userService.deleteUser(Number(id));
            res.status(204).send();
        }
        catch (err) {
            res.status(500).json({ error: 'Error deleting user' });
        }
    },
    validatePassword: async (req, res) => {
        const { userId, currentPassword } = req.body;
        if (!userId || !currentPassword) {
            res.status(400).json({ error: 'userId e currentPassword são obrigatórios' });
            return;
        }
        try {
            const user = await user_service_1.userService.getUserById(userId);
            if (!user) {
                res.status(404).json({ error: 'Usuário não encontrado' });
                return;
            }
            // Comparando a senha fornecida com a senha armazenada no banco
            const validPassword = await bcrypt_1.default.compare(currentPassword, user.password);
            if (!validPassword) {
                res.status(400).json({ error: 'Senha atual inválida' });
                return;
            }
            res.status(200).json({ valid: true });
        }
        catch (err) {
            console.error('Erro ao validar senha:', err);
            if (!res.headersSent) {
                res.status(500).json({ error: 'Erro ao validar senha' });
            }
        }
    },
};
