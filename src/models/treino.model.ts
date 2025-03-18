export interface Treino {
    id: number;
    aluno: number; // ID do aluno (numérico)
    planejamento?: string;
    objetivos?: string;
    nome_treino: string; // A, B, C, etc.
    bi_set?: string;
    exercicio_principal: string;
    auxiliar_1?: string;
    auxiliar_2?: string;
    series: number;
    repeticoes: string; // Usado VARCHAR para permitir intervalos como "10-12"
    tecnica: string;
    text?: string; // Descrição do treino (HTML ou texto)
    aerobicos?: string[]; // Lista de exercícios aeróbicos (se houver)
    showAerobicos?: boolean; // Flag para mostrar os aeróbicos
    created_at?: Date;
}

