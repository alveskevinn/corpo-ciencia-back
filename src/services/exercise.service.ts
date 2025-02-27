// exercise.service.ts
import { Exercise } from '../models/exercise.model';
import pool from '../config/db.config';

class ExerciseService {
  async getAllExercises(): Promise<Exercise[]> {
    const result = await pool.query('SELECT * FROM exercicios');
    return result.rows;
  }

  async getExerciseById(id: number): Promise<Exercise | null> {
    const result = await pool.query('SELECT * FROM exercicios WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async createExercise(exercise: Exercise): Promise<Exercise> {
    const { name, musculo_principal, category, group_muscular, video_url, auxiliar_1, auxiliar_2 } = exercise;
    const result = await pool.query(
      `INSERT INTO exercicios (nome, musculo_principal, categoria, grupo_muscular, video_url, auxiliar_1, auxiliar_2) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name, musculo_principal, category, group_muscular, video_url, auxiliar_1, auxiliar_2]
    );
    return result.rows[0];
  }

  async updateExercise(id: number, exercise: Exercise): Promise<Exercise | null> {
    const { name, musculo_principal, category, group_muscular, video_url, auxiliar_1, auxiliar_2 } = exercise;
    const result = await pool.query(
      `UPDATE exercicios SET nome = $1, musculo_principal = $2, categoria = $3, grupo_muscular = $4, video_url = $5, 
      auxiliar_1 = $6, auxiliar_2 = $7 WHERE id = $8 RETURNING *`,
      [name, musculo_principal, category, group_muscular, video_url, auxiliar_1, auxiliar_2, id]
    );
    return result.rows[0] || null;
  }  

  async deleteExercise(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM exercicios WHERE id = $1', [id]);
    return result.rowCount > 0;
  }
}

export default new ExerciseService();
