import { Request, Response } from "express";
import { userService } from "../services/user.service";
import { User } from "../models/user.model";

export const userController = {
    createUser: async (req: Request, res: Response): Promise<void> => {
        const user: User = req.body;

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

        try {
            const updatedUser = await userService.updateUser(Number(id), userUpdates);
            if (updatedUser) {
                res.status(200).json({ ...updatedUser, password: undefined });
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (err) {
            res.status(500).json({ error: 'Error updating user' });
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
};
