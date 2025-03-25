import { Request, Response } from 'express';
export declare class TrainingController {
    private trainingService;
    constructor();
    createTraining(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    getTrainings(req: Request, res: Response): Promise<void>;
}
