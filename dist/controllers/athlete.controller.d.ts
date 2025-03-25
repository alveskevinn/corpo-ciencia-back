import { Request, Response } from 'express';
export declare const AthleteController: {
    addAthlete: (req: Request, res: Response) => Promise<void>;
    getAllAthletes: (req: Request, res: Response) => Promise<void>;
    getAthleteByID: (req: Request, res: Response) => Promise<void>;
    updateAthlete: (req: Request, res: Response) => Promise<void>;
    deleteAthlete: (req: Request, res: Response) => Promise<void>;
    getFicha: (req: Request, res: Response) => Promise<void>;
    deleteFicha: (req: Request, res: Response) => Promise<void>;
};
