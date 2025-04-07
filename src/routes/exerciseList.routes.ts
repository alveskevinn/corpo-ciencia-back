import express from 'express';
import ExerciseController from '../controllers/exercise.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();


// -------------------------
// Listas de Exercícios
// -------------------------
router.get('/lists', authMiddleware, ExerciseController.getAllExerciseLists);
router.get('/lists/:id', authMiddleware, ExerciseController.getExerciseListById);
router.post('/lists', authMiddleware, ExerciseController.createExerciseList);
router.delete('/lists/:id', authMiddleware, ExerciseController.deleteExerciseList);

// -------------------------
// Itens da Lista
// -------------------------
router.get('/lists/:listId/items', authMiddleware, ExerciseController.getItemsByListId);
router.post('/lists/items', authMiddleware, ExerciseController.addItemToExerciseList);
router.delete('/lists/items/:itemId', authMiddleware, ExerciseController.removeItemFromList);

export default router;
