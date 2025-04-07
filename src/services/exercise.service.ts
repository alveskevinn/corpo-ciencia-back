import { Exercise } from '../models/exercise.model'
import pool from '../config/db.config'
import { ExerciseList } from '../models/exerciseList.model'
import { ExerciseListItem } from '../models/exerciseListItem.model'

class ExerciseService {
  async getAllExercises(): Promise<any[]> {
    const [rows] = await pool.execute('SELECT * FROM exercises')
    return rows as any[]
  }

  async getExerciseById(id: number): Promise<any | null> {
    const [rows] = await pool.execute('SELECT * FROM exercises WHERE id = ?', [
      id,
    ])
    return (rows as Exercise[]).length > 0 ? (rows as Exercise[])[0] : null
  }

  async createExercise(exercise: Partial<any>): Promise<Exercise> {
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
  
    const query = `
      INSERT INTO exercises (exercicio, musculo_principal, video, musculo_aux1, musculo_aux2)
      VALUES (?, ?, ?, ?, ?)
    `;
  
    try {
      const [result] = await pool.execute(query, sanitizedValues);
      const insertedId = (result as any).insertId;
  
      const [rows] = await pool.execute('SELECT * FROM exercises WHERE id = ?', [insertedId]);
      return (rows as Exercise[])[0];
    } catch (error: any) {
      console.error('Erro ao criar exercício no banco:', error);
  
      const message =
        error instanceof Error
          ? error.message
          : typeof error === 'string'
          ? error
          : JSON.stringify(error);
  
      throw new Error(`Erro ao criar exercício: ${message}`);
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

  async createExerciseList(data: { id: string; name: string; description: string }): Promise<ExerciseList> {
    const { id, name, description } = data;
    const query = `INSERT INTO exercise_lists (id, name, description) VALUES (?, ?, ?)`;
    await pool.execute(query, [id, name, description]);

    return { ...data, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
  }

  async getAllExerciseLists(): Promise<ExerciseList[]> {
    const [rows] = await pool.execute('SELECT * FROM exercise_lists');
    return rows as ExerciseList[];
  }

  async getExerciseListById(id: string): Promise<ExerciseList | null> {
    const [rows] = await pool.execute('SELECT * FROM exercise_lists WHERE id = ?', [id]);
    return (rows as ExerciseList[])[0] || null;
  }

  async deleteExerciseList(id: string): Promise<boolean> {
    await pool.execute('DELETE FROM exercise_list_items WHERE list_id = ?', [id]);
    const [result] = await pool.execute('DELETE FROM exercise_lists WHERE id = ?', [id]);
    return (result as any).affectedRows > 0;
  }

  async addExerciseToList(item: ExerciseListItem): Promise<void> {
    const { id, list_id, agonista, musculo_aux1, musculo_aux2 } = item;
    const query = `
      INSERT INTO exercise_list_items (id, list_id, agonista, musculo_aux1, musculo_aux2)
      VALUES (?, ?, ?, ?, ?)
    `;
    await pool.execute(query, [id, list_id, agonista, musculo_aux1, musculo_aux2]);
  }

  async getItemsByListId(listId: string): Promise<ExerciseListItem[]> {
    const [rows] = await pool.execute('SELECT * FROM exercise_list_items WHERE list_id = ?', [listId]);
    return rows as ExerciseListItem[];
  }

  async removeItemFromList(itemId: string): Promise<boolean> {
    const [result] = await pool.execute('DELETE FROM exercise_list_items WHERE id = ?', [itemId]);
    return (result as any).affectedRows > 0;
  }
}

export default new ExerciseService()
