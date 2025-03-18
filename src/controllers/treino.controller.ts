import { Request, Response } from 'express';
import TrainingService from '../services/treino.service';

export class TrainingController {
  private trainingService: TrainingService;

  constructor() {
    this.trainingService = new TrainingService();
  }

  // Criação de treino com exercícios
  async createTraining(req: Request, res: Response) {
    try {
      const trainingData = req.body; // Aqui, vamos receber um array de objetos.

      // Verificar se o campo "aluno" está presente em cada item do array
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

        // Verificar se os campos obrigatórios dentro de exercicios estão presentes
        if (!treino.exercicio || treino.exercicio.length === 0) {
          return res.status(400).json({ error: 'Nenhum exercício fornecido em um dos treinos' });
        }

        // Verificar se os campos obrigatórios dentro de aerobicos estão presentes, caso existam
        if (treino.showAerobicos && (!treino.aerobicos || treino.aerobicos.length === 0)) {
          return res.status(400).json({ error: 'Aeroóbicos são obrigatórios quando showAerobicos é verdadeiro' });
        }
      }

      // Chamar o serviço para processar o array de treinos
      const result = await this.trainingService.createTraining(trainingData);
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar treino' });
    }
  }

  // Obter treinos
  async getTrainings(req: Request, res: Response) {
    try {
      const trainings = await this.trainingService.getTrainings();
      res.json(trainings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar treinos' });
    }
  }
}
