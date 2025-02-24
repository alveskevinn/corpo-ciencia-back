import express from 'express';
import ExerciseController from '../controllers/exercise.controller';
import { authMiddleware } from '../middlewares/auth.middleware'  


const router = express.Router();

router.get('/', authMiddleware, ExerciseController.getAllExercises);
router.get('/:id', authMiddleware, ExerciseController.getExerciseById);
router.post('/', authMiddleware, ExerciseController.createExercise);
router.put('/:id', authMiddleware, ExerciseController.updateExercise);
router.delete('/:id', authMiddleware, ExerciseController.deleteExercise);

export default router;
