"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = __importDefault(require("../config/db.config"));
class ExerciseService {
    async getAllExercises() {
        const [rows] = await db_config_1.default.execute('SELECT * FROM exercises');
        return rows;
    }
    async getExerciseById(id) {
        const [rows] = await db_config_1.default.execute('SELECT * FROM exercises WHERE id = ?', [
            id,
        ]);
        return rows.length > 0 ? rows[0] : null;
    }
    async createExercise(exercise) {
        const { exercicio, musculo_principal, video, musculo_aux1, musculo_aux2, } = exercise;
        const sanitizedValues = [
            exercicio ?? null,
            musculo_principal ?? null,
            video ?? null,
            musculo_aux1 ?? null,
            musculo_aux2 ?? null,
        ];
        const query = `INSERT INTO exercises (exercicio, musculo_principal, video, musculo_aux1, musculo_aux2) 
                   VALUES (?, ?, ?, ?, ?)`;
        try {
            const [result] = await db_config_1.default.execute(query, sanitizedValues);
            const insertedId = result.insertId;
            const [rows] = await db_config_1.default.execute('SELECT * FROM exercises WHERE id = ?', [insertedId]);
            return rows[0];
        }
        catch (error) {
            throw new Error(`Error creating exercise: ${JSON.stringify(error)}`);
        }
    }
    async updateExercise(id, exercise) {
        const { exercicio, musculo_principal, video, musculo_aux1, musculo_aux2 } = exercise;
        const query = `UPDATE exercises SET exercicio = ?, musculo_principal = ?, video = ?, musculo_aux1 = ?, 
                   musculo_aux2 = ? WHERE id = ?`;
        const [result] = await db_config_1.default.execute(query, [exercicio, musculo_principal, video, musculo_aux1, musculo_aux2, id]);
        if (result.affectedRows === 0)
            return null;
        const [rows] = await db_config_1.default.execute('SELECT * FROM exercises WHERE id = ?', [id]);
        return rows[0] || null;
    }
    async deleteExercise(id) {
        const [result] = await db_config_1.default.execute('DELETE FROM exercises WHERE id = ?', [
            id,
        ]);
        const affectedRows = result.affectedRows;
        return affectedRows > 0;
    }
}
exports.default = new ExerciseService();
