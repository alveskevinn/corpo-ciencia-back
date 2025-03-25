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

  async createExercise(exercise: any): Promise<Exercise> {
    const {
      exercicio_principal,
      video_url,
      exercicio_aux1,
      exercicio_aux2,
    } = exercise;
  
    const sanitizedValues = [
      exercicio_principal ?? null,  
      video_url ?? null,
      exercicio_aux1 ?? null,
      exercicio_aux2 ?? null,
    ];
  
    const query = `INSERT INTO exercicios (exercicio_principal, video_url, exercicio_aux1, exercicio_aux2) 
                   VALUES (?, ?, ?, ?)`;
  
    try {
      const [result] = await pool.execute(query, sanitizedValues);
      const insertedId = (result as any).insertId;
      const [rows] = await pool.execute('SELECT * FROM exercicios WHERE id = ?', [insertedId]);
      return (rows as Exercise[])[0];
    } catch (error) {
      // Logando o erro completo
      console.error('Error creating exercise:', error);
  
      // Jogando o erro novamente com detalhes
      throw new Error(`Error creating exercise: ${JSON.stringify(error)}`);
    }
  }
  
  
  
  async updateExercise(id: number, exercise: any): Promise<Exercise | null> {
    const { name, musculo_principal, group_muscular, video_url, exercicio_aux1, exercicio_aux2 } = exercise;
    const query = `UPDATE exercicios SET nome = ?, musculo_principal = ?,  grupo_muscular = ?, video_url = ?, 
                   exercicio_aux1 = ?, exercicio_aux2 = ? WHERE id = ?`;
    const [result] = await pool.execute(query, [name, musculo_principal,  group_muscular, video_url, exercicio_aux1, exercicio_aux2, id]);
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
