import { Request, Response } from 'express';
declare class ExerciseController {
    getAllExercises(req: Request, res: Response): Promise<void>;
    getExerciseById(req: Request, res: Response): Promise<void>;
    createExercise(req: Request, res: Response): Promise<void>;
    updateExercise(req: Request, res: Response): Promise<void>;
    deleteExercise(req: Request, res: Response): Promise<void>;
}
declare const _default: ExerciseController;
export default _default;
