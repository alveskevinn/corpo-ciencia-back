import { Router, Request, Response, NextFunction } from 'express';
import { TrainingController } from '../controllers/treino.controller';

const router = Router();
const trainingController = new TrainingController();

// Função middleware para lidar com funções assíncronas corretamente
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return fn(req, res, next).catch(next);  // Captura os erros e os passa para o middleware de erro do Express
  };
};

router.post('/', asyncHandler((req: Request, res: Response) => trainingController.createTraining(req, res)));
router.get('/', asyncHandler((req: Request, res: Response) => trainingController.getTrainings(req, res)));

export default router;
