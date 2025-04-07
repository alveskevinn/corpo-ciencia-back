import { Request, Response } from 'express';
import ExerciseService from '../services/exercise.service';
import { Exercise } from '../models/exercise.model';
import { uploadVideoToS3 } from '../services/uploadVideoToS3.service';

class ExerciseController {
  async getAllExercises(req: Request, res: Response): Promise<void> {
    try {
      const exercises = await ExerciseService.getAllExercises();
      res.status(200).json(exercises);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching exercises', error: err });
    }
  }

  async getExerciseById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const exercise = await ExerciseService.getExerciseById(Number(id));
      if (exercise) {
        res.status(200).json(exercise);
      } else {
        res.status(404).json({ message: 'Exercise not found' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Error fetching exercise', error: err });
    }
  }

  async createExercise(req: Request, res: Response): Promise<void> {
    console.log("req.body", req.body);
    try {
      const exercicio = req.body.exercicio?.toString().trim();
      const musculo_principal = req.body.musculo_principal?.toString().trim();
      const musculo_aux1 = req.body.musculo_aux1?.toString().trim();
      const musculo_aux2 = req.body.musculo_aux2?.toString().trim();
  
      console.log('Campos recebidos:', {
        exercicio,
        musculo_principal,
        musculo_aux1,
        musculo_aux2,
        file: req.file,
      });
  
      let videoUrl: string | null = null;
      if (req.file) {
        videoUrl = await uploadVideoToS3(req.file); // ✅ req.file é o correto
      }
  
      const newExercise = await ExerciseService.createExercise({
        exercicio,
        musculo_principal,
        musculo_aux1: musculo_aux1 || null,
        musculo_aux2: musculo_aux2 || null,
        video: videoUrl,
      });
  
      res.status(201).json(newExercise);
    } catch (err) {
      console.error('Erro ao criar exercício no banco:', err);
      res.status(500).json({
        message: 'Erro ao criar exercício',
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }
  
  
  

  async updateExercise(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const exercise: Exercise = req.body;
      const updatedExercise = await ExerciseService.updateExercise(Number(id), exercise);
      if (updatedExercise) {
        res.status(200).json(updatedExercise);
      } else {
        res.status(404).json({ message: 'Exercise not found' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Error updating exercise', error: err });
    }
  }

  async deleteExercise(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const success = await ExerciseService.deleteExercise(Number(id));
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Exercise not found' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Error deleting exercise', error: err });
    }
  }

  async createExerciseList(req: Request, res: Response): Promise<void> {
    try {
      const { id, name, description } = req.body;
      const newList = await ExerciseService.createExerciseList({ id, name, description });
      res.status(201).json(newList);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao criar lista de exercícios', error: err });
    }
  }

  async getAllExerciseLists(req: Request, res: Response): Promise<void> {
    try {
      const lists = await ExerciseService.getAllExerciseLists();
      res.status(200).json(lists);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao buscar listas', error: err });
    }
  }

  async getExerciseListById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const list = await ExerciseService.getExerciseListById(id);
      if (list) {
        res.status(200).json(list);
      } else {
        res.status(404).json({ message: 'Lista não encontrada' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Erro ao buscar lista', error: err });
    }
  }

  async deleteExerciseList(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const success = await ExerciseService.deleteExerciseList(id);
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Lista não encontrada' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Erro ao deletar lista', error: err });
    }
  }

  async addItemToExerciseList(req: Request, res: Response): Promise<void> {
    try {
      const { id, list_id, agonista, musculo_aux1, musculo_aux2 } = req.body;
      // @ts-ignore
      await ExerciseService.addExerciseToList({ id, list_id, agonista, musculo_aux1, musculo_aux2 });
      res.status(201).json({ message: 'Item adicionado com sucesso' });
    } catch (err) {
      res.status(500).json({ message: 'Erro ao adicionar item na lista', error: err });
    }
  }

  async getItemsByListId(req: Request, res: Response): Promise<void> {
    try {
      const { listId } = req.params;
      const items = await ExerciseService.getItemsByListId(listId);
      res.status(200).json(items);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao buscar itens da lista', error: err });
    }
  }

  async removeItemFromList(req: Request, res: Response): Promise<void> {
    try {
      const { itemId } = req.params;
      const success = await ExerciseService.removeItemFromList(itemId);
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Item não encontrado' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Erro ao remover item', error: err });
    }
  }
}

export default new ExerciseController();
