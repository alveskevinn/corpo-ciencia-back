export interface Treino {
    id: number;
    aluno: number;
    planejamento?: string;
    objetivos?: string;
    nome_treino: string;
    bi_set?: string;
    exercicio_principal: string;
    auxiliar_1?: string;
    auxiliar_2?: string;
    series: number;
    repeticoes: string;
    tecnica: string;
    text?: string;
    aerobicos?: string[];
    showAerobicos?: boolean;
    created_at?: Date;
}
