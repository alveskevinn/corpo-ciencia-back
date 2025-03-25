export interface User {
    id?: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    status: 'active' | 'inactive';
    created_at?: string;
    updated_at?: string;
}
