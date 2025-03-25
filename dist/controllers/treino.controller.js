"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainingController = void 0;
const treino_service_1 = __importDefault(require("../services/treino.service"));
class TrainingController {
    constructor() {
        this.trainingService = new treino_service_1.default();
    }
    async createTraining(req, res) {
        try {
            const trainingData = req.body;
            for (let treino of trainingData) {
                if (!treino.aluno) {
                    return res.status(400).json({ error: 'Campo "aluno" é obrigatório em todos os treinos' });
                }
                if (!treino.nome_treino) {
                    return res.status(400).json({ error: 'Campo "nome_treino" é obrigatório em todos os treinos' });
                }
                if (!treino.text) {
                    return res.status(400).json({ error: 'Campo "text" é obrigatório em todos os treinos' });
                }
                if (!treino.exercicio || treino.exercicio.length === 0) {
                    return res.status(400).json({ error: 'Nenhum exercício fornecido em um dos treinos' });
                }
                if (treino.showAerobicos && (!treino.aerobicos || treino.aerobicos.length === 0)) {
                    return res.status(400).json({ error: 'Aeroóbicos são obrigatórios quando showAerobicos é verdadeiro' });
                }
            }
            const result = await this.trainingService.createTraining(trainingData);
            res.status(201).json(result);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao criar treino' });
        }
    }
    async getTrainings(req, res) {
        try {
            const trainings = await this.trainingService.getTrainings();
            res.json(trainings);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar treinos' });
        }
    }
}
exports.TrainingController = TrainingController;
