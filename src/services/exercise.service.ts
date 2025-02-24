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
    const { name, description, category, group_muscular, video_url } = exercise;
    const result = await pool.query(
      'INSERT INTO exercicios (nome, descricao, categoria, grupo_muscular, video_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, category, group_muscular, video_url]
    );
    return result.rows[0];
  }
  

  async updateExercise(id: number, exercise: Exercise): Promise<Exercise | null> {
    const { name, description, category, group_muscular, video_url } = exercise;
    const result = await pool.query(
      'UPDATE exercicios SET name = $1, description = $2, category = $3, group_muscular = $4, video_url = $5 WHERE id = $6 RETURNING *',
      [name, description, category, group_muscular, video_url, id]
    );
    return result.rows[0] || null;
  }

  async deleteExercise(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM exercicios WHERE id = $1', [id]);
    return result.rowCount > 0;
  }
}

export default new ExerciseService();
