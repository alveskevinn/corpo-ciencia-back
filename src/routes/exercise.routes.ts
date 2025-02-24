// exercise.routes.ts
import express from 'express';
import ExerciseController from '../controllers/exercise.controller';


const router = express.Router();

router.get('/', ExerciseController.getAllExercises);
router.get('/:id', ExerciseController.getExerciseById);
router.post('/', ExerciseController.createExercise);
router.put('/:id', ExerciseController.updateExercise);
router.delete('/:id', ExerciseController.deleteExercise);

export default router;
