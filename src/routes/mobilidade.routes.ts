import express from 'express';
import MobilidadeController from '../controllers/mobilidade.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.get('/', authMiddleware, MobilidadeController.getAll);
router.get('/:id', authMiddleware, MobilidadeController.getById);
router.post('/', authMiddleware, upload.single('video'), MobilidadeController.create);
router.put('/:id', authMiddleware, upload.single('video'), MobilidadeController.update);
router.delete('/:id', authMiddleware, MobilidadeController.delete);

export default router;
