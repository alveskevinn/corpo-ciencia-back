// Interface para representar a lista de exercícios
export interface ExerciseList {
    id: number;                      // Identificador único da lista de exercícios
    name: string;                    // Nome da lista de exercícios
    description: string | null;       // Descrição da lista de exercícios (pode ser nula)
    createdAt: string;               // Data de criação
}

// Interface para representar os detalhes de cada exercício na lista

