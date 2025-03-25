import { Router, Request, Response, NextFunction } from 'express';
import { TrainingController } from '../controllers/treino.controller';

const router = Router();
const trainingController = new TrainingController();

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return fn(req, res, next).catch(next);  
  };
};

router.post('/', asyncHandler((req: Request, res: Response) => trainingController.createTraining(req, res)));
router.get('/', asyncHandler((req: Request, res: Response) => trainingController.getTrainings(req, res)));

export default router;
