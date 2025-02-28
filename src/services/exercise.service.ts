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
    const { name, description, category, group_muscular, video_url } = exercise
    const [result] = await pool.execute(
      'INSERT INTO exercicios (nome, descricao, categoria, grupo_muscular, video_url) VALUES (?, ?, ?, ?, ?)',
      [name, description, category, group_muscular, video_url],
    )
    const insertedId = (result as any).insertId 
    return {
      id: insertedId,
      name,
      description,
      category,
      group_muscular,
      video_url,
    }
  }

  async updateExercise(
    id: number,
    exercise: Exercise,
  ): Promise<Exercise | null> {
    const { name, description, category, group_muscular, video_url } = exercise
    const [result] = await pool.execute(
      'UPDATE exercicios SET nome = ?, descricao = ?, categoria = ?, grupo_muscular = ?, video_url = ? WHERE id = ?',
      [name, description, category, group_muscular, video_url, id],
    )
    const affectedRows = (result as any).affectedRows // A propriedade 'affectedRows' está dentro de 'result'
    return affectedRows > 0
      ? { id, name, description, category, group_muscular, video_url }
      : null
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
