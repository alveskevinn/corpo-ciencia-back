"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = __importDefault(require("../config/db.config"));
class ExerciseService {
    async getAllExercises() {
        const [rows] = await db_config_1.default.execute('SELECT * FROM exercicios');
        return rows;
    }
    async getExerciseById(id) {
        const [rows] = await db_config_1.default.execute('SELECT * FROM exercicios WHERE id = ?', [
            id,
        ]);
        return rows.length > 0 ? rows[0] : null;
    }
    async createExercise(exercise) {
        const { exercicio_principal, video_url, exercicio_aux1, exercicio_aux2, } = exercise;
        const sanitizedValues = [
            exercicio_principal ?? null,
            video_url ?? null,
            exercicio_aux1 ?? null,
            exercicio_aux2 ?? null,
        ];
        const query = `INSERT INTO exercicios (exercicio_principal, video_url, exercicio_aux1, exercicio_aux2) 
                   VALUES (?, ?, ?, ?)`;
        try {
            const [result] = await db_config_1.default.execute(query, sanitizedValues);
            const insertedId = result.insertId;
            const [rows] = await db_config_1.default.execute('SELECT * FROM exercicios WHERE id = ?', [insertedId]);
            return rows[0];
        }
        catch (error) {
            // Logando o erro completo
            console.error('Error creating exercise:', error);
            // Jogando o erro novamente com detalhes
            throw new Error(`Error creating exercise: ${JSON.stringify(error)}`);
        }
    }
    async updateExercise(id, exercise) {
        const { name, musculo_principal, group_muscular, video_url, exercicio_aux1, exercicio_aux2 } = exercise;
        const query = `UPDATE exercicios SET nome = ?, musculo_principal = ?,  grupo_muscular = ?, video_url = ?, 
                   exercicio_aux1 = ?, exercicio_aux2 = ? WHERE id = ?`;
        const [result] = await db_config_1.default.execute(query, [name, musculo_principal, group_muscular, video_url, exercicio_aux1, exercicio_aux2, id]);
        if (result.affectedRows === 0)
            return null;
        const [rows] = await db_config_1.default.execute('SELECT * FROM exercicios WHERE id = ?', [id]);
        return rows[0] || null;
    }
    async deleteExercise(id) {
        const [result] = await db_config_1.default.execute('DELETE FROM exercicios WHERE id = ?', [
            id,
        ]);
        const affectedRows = result.affectedRows; // A propriedade 'affectedRows' está dentro de 'result'
        return affectedRows > 0;
    }
}
exports.default = new ExerciseService();
