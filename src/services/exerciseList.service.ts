import pool from '../config/db.config';
import { ExerciseList } from '../models/exerciseList.model';

class ExerciseListService {
  // Criar uma nova lista de exercícios
  async createExerciseList(name: string, description: string | null = null): Promise<ExerciseList> {
    try {
      const [result] = await pool.execute(
        'INSERT INTO exercises_list (name, description, created_at) VALUES (?, ?, NOW())',
        [name, description]
      );

      const insertId = (result as { insertId: number }).insertId;

      const exerciseList = await this.getExerciseListById(insertId);
      if (!exerciseList) {
        throw new Error('Erro ao obter a lista de exercícios recém-criada');
      }
      return exerciseList;
    } catch (err) {
      console.error('Erro ao criar lista de exercícios:', err);
      throw new Error('Erro ao criar lista de exercícios');
    }
  }

  // Obter todas as listas de exercícios
  async getAllExerciseLists(): Promise<ExerciseList[]> {
    try {
      const [rows] = await pool.execute('SELECT * FROM exercises_list');
      return rows as ExerciseList[];
    } catch (err) {
      console.error('Erro ao obter todas as listas de exercícios:', err);
      throw new Error('Erro ao obter todas as listas de exercícios');
    }
  }

  // Obter uma lista de exercícios pelo ID
  async getExerciseListById(id: number): Promise<ExerciseList | null> {
    try {
      const [rows] = await pool.execute('SELECT * FROM exercises_list WHERE id = ?', [id]);
      return Array.isArray(rows) && rows.length > 0 ? rows[0] as ExerciseList : null;
    } catch (err) {
      console.error('Erro ao obter lista de exercícios por ID:', err);
      throw new Error('Erro ao obter lista de exercícios por ID');
    }
  }

  // Deletar uma lista de exercícios
  async deleteExerciseList(id: number): Promise<boolean> {
    try {
      const [result] = await pool.execute('DELETE FROM exercises_list WHERE id = ?', [id]);
      const affectedRows = (result as { affectedRows: number }).affectedRows;
      return affectedRows > 0;
    } catch (err) {
      console.error('Erro ao deletar lista de exercícios:', err);
      throw new Error('Erro ao deletar lista de exercícios');
    }
  }
}

export default new ExerciseListService();
