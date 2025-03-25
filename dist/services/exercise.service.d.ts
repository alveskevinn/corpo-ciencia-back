import { Exercise } from '../models/exercise.model';
declare class ExerciseService {
    getAllExercises(): Promise<Exercise[]>;
    getExerciseById(id: number): Promise<Exercise | null>;
    createExercise(exercise: any): Promise<Exercise>;
    updateExercise(id: number, exercise: any): Promise<Exercise | null>;
    deleteExercise(id: number): Promise<boolean>;
}
declare const _default: ExerciseService;
export default _default;
