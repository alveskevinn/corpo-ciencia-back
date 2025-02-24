export interface User {
    id?: number;
    first_name: string;
    last_name: string; // Mantido de acordo com o seu modelo anterior
    email: string;
    password: string;
    role: 'user' | 'admin';
    status: 'active' | 'inactive';
    created_at?: string;
    updated_at?: string;
}
