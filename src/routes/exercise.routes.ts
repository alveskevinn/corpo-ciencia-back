import express from 'express';
import ExerciseController from '../controllers/exercise.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

// -------------------------
// Exercícios
// -------------------------
router.get('/', authMiddleware, ExerciseController.getAllExercises);
router.get('/:id', authMiddleware, ExerciseController.getExerciseById);
router.post('/', upload.single('video'), ExerciseController.createExercise);
router.put('/:id', authMiddleware, ExerciseController.updateExercise);
router.delete('/:id', authMiddleware, ExerciseController.deleteExercise);



export default router;
