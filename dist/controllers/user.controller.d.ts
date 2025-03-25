import { Request, Response } from "express";
export declare const userController: {
    createUser: (req: Request, res: Response) => Promise<void>;
    getAllUsers: (_req: Request, res: Response) => Promise<void>;
    getUserById: (req: Request, res: Response) => Promise<void>;
    updateUser: (req: Request, res: Response) => Promise<void>;
    deleteUser: (req: Request, res: Response) => Promise<void>;
    validatePassword: (req: Request, res: Response) => Promise<void>;
};
