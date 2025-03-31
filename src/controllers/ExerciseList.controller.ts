import { Request, Response } from 'express';
import exerciseListService from '../services/exerciseList.service';
import exerciseDetailsService from '../services/exerciseDetails.service';

export const ExerciseListController = {
  // Criar uma nova lista de exercícios junto com os detalhes
  createExerciseListWithDetails: async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, description, exercises } = req.body;

      if (!name || !exercises || exercises.length === 0) {
        res.status(400).json({ message: 'Nome e lista de exercícios são obrigatórios' });
        return;
      }

      // Criar a lista de exercícios
      const newExerciseList = await exerciseListService.createExerciseList(name, description);

      // Criar os detalhes dos exercícios associados à lista
      const exerciseDetailsPromises = exercises.map(async (exercise: any) => {
        const { id, agonista, musculo_aux1, musculo_aux2 } = exercise;

        if (!id || !agonista) {
          throw new Error('Campos obrigatórios ausentes nos detalhes do exercício');
        }

        // Criar o detalhe do exercício
        await exerciseDetailsService.createExerciseDetail(newExerciseList.id, id, agonista, musculo_aux1, musculo_aux2);
      });

      // Espera a criação de todos os exercícios antes de retornar a resposta
      await Promise.all(exerciseDetailsPromises);

      res.status(201).json({
        message: 'Lista de exercícios criada com sucesso',
        exerciseList: newExerciseList,
        exercises: exercises,
      });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar lista de exercícios e detalhes', error });
    }
  },

  // Obter todas as listas de exercícios com detalhes
  getAllExerciseLists: async (req: Request, res: Response): Promise<void> => {
    try {
      const exerciseLists = await exerciseListService.getAllExerciseLists();
      res.json(exerciseLists);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar listas de exercícios', error });
    }
  },

  // Obter uma lista de exercícios com seus detalhes pelo ID
  getExerciseListWithDetailsByID: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const exerciseList = await exerciseListService.getExerciseListById(Number(id));

      if (!exerciseList) {
        res.status(404).json({ message: 'Lista de exercícios não encontrada' });
        return;
      }

      // Obter os detalhes dos exercícios associados à lista
      const exerciseDetails = await exerciseDetailsService.getExerciseDetailById(Number(id));

      res.json({
        exerciseList,
        exercises: exerciseDetails,
      });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar lista de exercícios e seus detalhes', error });
    }
  },

  // Deletar uma lista de exercícios e seus detalhes
  deleteExerciseListWithDetails: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      // Deletar todos os detalhes dos exercícios associados à lista
      await exerciseDetailsService.deleteExerciseDetail(Number(id));

      // Deletar a lista de exercícios
      const deleted = await exerciseListService.deleteExerciseList(Number(id));

      if (!deleted) {
        res.status(404).json({ message: 'Lista de exercícios não encontrada' });
        return;
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar lista de exercícios e seus detalhes', error });
    }
  }
};
