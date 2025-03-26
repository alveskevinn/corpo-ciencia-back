import { Exercise } from '../models/exercise.model'
import pool from '../config/db.config'

class ExerciseService {
  async getAllExercises(): Promise<any[]> {
    const [rows] = await pool.execute('SELECT * FROM exercises')
    return rows as any[]
  }

  async getExerciseById(id: number): Promise<Exercise | null> {
    const [rows] = await pool.execute('SELECT * FROM exercises WHERE id = ?', [
      id,
    ])
    return (rows as Exercise[]).length > 0 ? (rows as Exercise[])[0] : null
  }

  async createExercise(exercise: any): Promise<Exercise> {
    const {
      exercicio,
      musculo_principal,
      video,
      musculo_aux1,
      musculo_aux2,
    } = exercise;

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
      const [result] = await pool.execute(query, sanitizedValues);
      const insertedId = (result as any).insertId;
      const [rows] = await pool.execute('SELECT * FROM exercises WHERE id = ?', [insertedId]);
      return (rows as Exercise[])[0];
    } catch (error) {
  
      throw new Error(`Error creating exercise: ${JSON.stringify(error)}`);
    }
  }

  async updateExercise(id: number, exercise: any): Promise<Exercise | null> {
    const { exercicio, musculo_principal, video, musculo_aux1, musculo_aux2 } = exercise;
    const query = `UPDATE exercises SET exercicio = ?, musculo_principal = ?, video = ?, musculo_aux1 = ?, 
                   musculo_aux2 = ? WHERE id = ?`;
    const [result] = await pool.execute(query, [exercicio, musculo_principal, video, musculo_aux1, musculo_aux2, id]);
    if ((result as any).affectedRows === 0) return null;
    const [rows] = await pool.execute('SELECT * FROM exercises WHERE id = ?', [id]);
    return (rows as Exercise[])[0] || null;
  }

  async deleteExercise(id: number): Promise<boolean> {
    const [result] = await pool.execute('DELETE FROM exercises WHERE id = ?', [
      id,
    ])
    const affectedRows = (result as any).affectedRows 
    return affectedRows > 0
  }
}

export default new ExerciseService()
