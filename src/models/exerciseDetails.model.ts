export interface ExerciseDetails {
    id: string;                      // ID único do exercício (UUID)
    exerciseListId: number;          // Referência à lista de exercícios
    agonista: string;                // Musculo agonista principal
    musculoAux1: string | null;      // Músculo auxiliar 1 (pode ser nulo)
    musculoAux2: string | null;      // Músculo auxiliar 2 (pode ser nulo)
    createdAt: string;               // Data de criação
}