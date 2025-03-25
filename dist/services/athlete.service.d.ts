import { Athlete } from '../models/athlete.model';
export declare const AthleteService: {
    create: ({ firstName, email, status }: Omit<Athlete, "id">) => Promise<{
        id: any;
        firstName: string;
        email: string;
        status: "active" | "inactive";
    }>;
    getAll: () => Promise<Athlete[]>;
    findByEmail: (email: string) => Promise<Athlete | null>;
    getAthleteByEmail: (email: string) => Promise<Athlete | null>;
    getByID: (id: number) => Promise<Athlete | null>;
    update: (id: number, data: Partial<Omit<Athlete, "id">>) => Promise<{
        id: number;
        firstName: string | undefined;
        email: string | undefined;
        status: "active" | "inactive" | undefined;
    } | null>;
    delete: (id: number) => Promise<void>;
};
