import { Request, Response } from 'express';
import ExerciseService from '../services/exercise.service';
import { Exercise } from '../models/exercise.model';

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
    try {
      const exercise: Exercise = req.body;
      const newExercise = await ExerciseService.createExercise(exercise);
      res.status(201).json(newExercise);
    } catch (err) {
      res.status(500).json({ message: 'Error creating exercise', error: err });
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
}

export default new ExerciseController();
