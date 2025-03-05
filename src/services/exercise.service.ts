import { Exercise } from '../models/exercise.model'
import pool from '../config/db.config'

class ExerciseService {
  async getAllExercises(): Promise<Exercise[]> {
    const [rows] = await pool.execute('SELECT * FROM exercicios')
    return rows as Exercise[]
  }

  async getExerciseById(id: number): Promise<Exercise | null> {
    const [rows] = await pool.execute('SELECT * FROM exercicios WHERE id = ?', [
      id,
    ])
    return (rows as Exercise[]).length > 0 ? (rows as Exercise[])[0] : null
  }

  async createExercise(exercise: Exercise): Promise<Exercise> {
    const { name, musculo_principal, category, group_muscular, video_url, auxiliar_1, auxiliar_2 } = exercise;
    const query = `INSERT INTO exercicios (nome, musculo_principal, categoria, grupo_muscular, video_url, auxiliar_1, auxiliar_2) 
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await pool.execute(query, [name, musculo_principal, category, group_muscular, video_url, auxiliar_1, auxiliar_2]);
    const insertedId = (result as any).insertId;
    const [rows] = await pool.execute('SELECT * FROM exercicios WHERE id = ?', [insertedId]);
    return (rows as Exercise[])[0];
  }
  
  async updateExercise(id: number, exercise: Exercise): Promise<Exercise | null> {
    const { name, musculo_principal, category, group_muscular, video_url, auxiliar_1, auxiliar_2 } = exercise;
    const query = `UPDATE exercicios SET nome = ?, musculo_principal = ?, categoria = ?, grupo_muscular = ?, video_url = ?, 
                   auxiliar_1 = ?, auxiliar_2 = ? WHERE id = ?`;
    const [result] = await pool.execute(query, [name, musculo_principal, category, group_muscular, video_url, auxiliar_1, auxiliar_2, id]);
    if ((result as any).affectedRows === 0) return null;
    const [rows] = await pool.execute('SELECT * FROM exercicios WHERE id = ?', [id]);
    return (rows as Exercise[])[0] || null;
  }

  async deleteExercise(id: number): Promise<boolean> {
    const [result] = await pool.execute('DELETE FROM exercicios WHERE id = ?', [
      id,
    ])
    const affectedRows = (result as any).affectedRows // A propriedade 'affectedRows' está dentro de 'result'
    return affectedRows > 0
  }
}

export default new ExerciseService()
