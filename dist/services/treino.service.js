"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = __importDefault(require("../config/db.config"));
class TrainingService {
    async createTraining(trainingData) {
        console.log('🔹 Dados do treinamento recebidos:', JSON.stringify(trainingData, null, 2));
        for (const training of trainingData) {
            try {
                const queryTreino = `
  INSERT INTO treino 
  (aluno, planejamento, objetivos, nome_treino, text, aerobicos, showAerobicos, exercicios) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`;
                const valuesTreino = [
                    training.aluno,
                    training.planejamento,
                    training.objetivos,
                    training.nome_treino,
                    training.text ?? null,
                    training.aerobicos ? JSON.stringify(training.aerobicos) : null,
                    training.showAerobicos ?? null,
                    training.exercicio ? JSON.stringify(training.exercicio) : null,
                ];
                console.log('📝 Inserindo treino com valores:', valuesTreino);
                const [resultTreino] = await db_config_1.default.execute(queryTreino, valuesTreino);
                const treinoId = resultTreino.insertId;
                console.log('✅ Treino inserido com ID:', treinoId);
            }
            catch (error) {
                console.error('❌ Erro ao criar treino e exercícios:', error);
                throw new Error('Erro ao criar treino');
            }
        }
        console.log('✅ Todos os treinos foram processados!');
        return { message: 'Treinos e exercícios criados com sucesso!' };
    }
    async getTrainings() {
        const query = 'SELECT * FROM treino';
        try {
            const [trainings] = await db_config_1.default.execute(query);
            console.log('📊 Treinos retornados do banco:', trainings);
            return trainings;
        }
        catch (error) {
            console.error('❌ Erro ao buscar treinos:', error);
            if (error instanceof Error) {
                throw new Error(`Erro ao buscar treinos: ${error.message}`);
            }
            throw new Error('Erro ao buscar treinos: erro desconhecido');
        }
    }
}
exports.default = TrainingService;
