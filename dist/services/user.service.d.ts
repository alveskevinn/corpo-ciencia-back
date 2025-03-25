import { User } from '../models/user.model';
export declare const userService: {
    createUser: (user: User) => Promise<any>;
    getAllUsers: () => Promise<User[]>;
    getUserById: (id: number) => Promise<User | null>;
    updateUser: (id: number, user: Partial<User>) => Promise<User | null>;
    deleteUser: (id: number) => Promise<void>;
    getUserByEmail: (email: string) => Promise<User | null>;
};
