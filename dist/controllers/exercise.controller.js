"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exercise_service_1 = __importDefault(require("../services/exercise.service"));
class ExerciseController {
    async getAllExercises(req, res) {
        try {
            const exercises = await exercise_service_1.default.getAllExercises();
            res.status(200).json(exercises);
        }
        catch (err) {
            res.status(500).json({ message: 'Error fetching exercises', error: err });
        }
    }
    async getExerciseById(req, res) {
        try {
            const { id } = req.params;
            const exercise = await exercise_service_1.default.getExerciseById(Number(id));
            if (exercise) {
                res.status(200).json(exercise);
            }
            else {
                res.status(404).json({ message: 'Exercise not found' });
            }
        }
        catch (err) {
            res.status(500).json({ message: 'Error fetching exercise', error: err });
        }
    }
    async createExercise(req, res) {
        try {
            const exercise = req.body;
            const newExercise = await exercise_service_1.default.createExercise(exercise);
            res.status(201).json(newExercise);
        }
        catch (err) {
            res.status(500).json({ message: 'Error creating exercise', error: err });
        }
    }
    async updateExercise(req, res) {
        try {
            const { id } = req.params;
            const exercise = req.body;
            const updatedExercise = await exercise_service_1.default.updateExercise(Number(id), exercise);
            if (updatedExercise) {
                res.status(200).json(updatedExercise);
            }
            else {
                res.status(404).json({ message: 'Exercise not found' });
            }
        }
        catch (err) {
            res.status(500).json({ message: 'Error updating exercise', error: err });
        }
    }
    async deleteExercise(req, res) {
        try {
            const { id } = req.params;
            const success = await exercise_service_1.default.deleteExercise(Number(id));
            if (success) {
                res.status(204).send();
            }
            else {
                res.status(404).json({ message: 'Exercise not found' });
            }
        }
        catch (err) {
            res.status(500).json({ message: 'Error deleting exercise', error: err });
        }
    }
}
exports.default = new ExerciseController();
