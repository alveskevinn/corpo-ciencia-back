import { Request, Response } from "express";
import { userService } from "../services/user.service";
import bcrypt from 'bcrypt';
import { User } from "../models/user.model";

export const userController = {
    createUser: async (req: Request, res: Response): Promise<void> => {
        const user = req.body;

        if (!user.password) {
            res.status(400).json({ error: "Password is required" });
            return;
        }

        try {
            const newUser = await userService.createUser(user);
            res.status(201).json({ ...newUser, password: undefined });
        } catch (err) {
            res.status(500).json({ error: 'Error creating user' });
        }
    },

    getAllUsers: async (_req: Request, res: Response): Promise<void> => {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json({ error: 'Error fetching users' });
        }
    },

    getUserById: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            const user = await userService.getUserById(Number(id));
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (err) {
            res.status(500).json({ error: 'Error fetching user' });
        }
    },

    updateUser: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const userUpdates: Partial<User> = req.body;
        const { currentPassword } = req.body;
    
        try {
            const user = await userService.getUserById(Number(id));
            if (!user) {
                res.status(404).json({ error: 'Usuário não encontrado' });
                return;
            }
    
            if (currentPassword) {
                const validPassword = await bcrypt.compare(currentPassword, user.password);
                if (!validPassword) {
                    res.status(400).json({ error: 'Senha atual inválida' });
                    return;
                }
            }
    
            let hashedPassword = userUpdates.password ? await bcrypt.hash(userUpdates.password, 10) : undefined;
    
            const updatedUser = await userService.updateUser(Number(id), {
                ...userUpdates,
                password: hashedPassword,
            });
    
            if (updatedUser) {
                res.status(200).json({ ...updatedUser, password: undefined });
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (err) {
            console.error('Error updating user:', err);
            res.status(500).json({ error: 'Error updating user', details: err });
        }
    },
    

    deleteUser: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            await userService.deleteUser(Number(id));
            res.status(204).send();
        } catch (err) {
            res.status(500).json({ error: 'Error deleting user' });
        }
    },

    validatePassword: async (req: Request, res: Response): Promise<void> => {
        const { userId, currentPassword } = req.body;
    
        if (!userId || !currentPassword) {
            res.status(400).json({ error: 'userId e currentPassword são obrigatórios' });
            return;
        }
    
        try {
            const user = await userService.getUserById(userId);
    
            if (!user) {
                res.status(404).json({ error: 'Usuário não encontrado' });
                return;
            }
    
            // Comparando a senha fornecida com a senha armazenada no banco
            const validPassword = await bcrypt.compare(currentPassword, user.password);
    
            if (!validPassword) {
                res.status(400).json({ error: 'Senha atual inválida' });
                return;
            }
    
            res.status(200).json({ valid: true });
        } catch (err) {
            console.error('Erro ao validar senha:', err);
            if (!res.headersSent) {
                res.status(500).json({ error: 'Erro ao validar senha' });
            }
        }
    },
    
};
