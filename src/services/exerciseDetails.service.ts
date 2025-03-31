import { ExerciseDetails } from '../models/exerciseDetails.model';
import pool from '../config/db.config';

class ExerciseDetailsService {
  async createExerciseDetail(
    exerciseListId: number,
    id: string,
    agonista: string,
    musculoAux1: string | null,
    musculoAux2: string | null
  ): Promise<ExerciseDetails> {
    try {
      const [result] = await pool.execute(
        'INSERT INTO exercise_details (id, exercise_list_id, agonista, musculo_aux1, musculo_aux2, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
        [id, exerciseListId, agonista, musculoAux1, musculoAux2]
      );

      const insertId = (result as { insertId: number }).insertId;

      const exerciseDetail = await this.getExerciseDetailById(Number(id));
      if (!exerciseDetail) {
        throw new Error('Erro ao obter o exercício recém-criado');
      }
      return exerciseDetail;
    } catch (err) {
      console.error('Erro ao criar exercício:', err);
      throw new Error('Erro ao criar exercício');
    }
  }

  // Obter todos os exercícios de uma lista
  async getAllExerciseDetails(): Promise<ExerciseDetails[]> {
    try {
      const [rows] = await pool.execute('SELECT * FROM exercise_details');
      return rows as ExerciseDetails[];
    } catch (err) {
      console.error('Erro ao obter todos os exercícios:', err);
      throw new Error('Erro ao obter todos os exercícios');
    }
  }

  async getExerciseDetailById(id: number): Promise<ExerciseDetails | null> {
    try {
      const [rows] = await pool.execute('SELECT * FROM exercise_details WHERE id = ?', [id]);
      return Array.isArray(rows) && rows.length > 0 ? rows[0] as ExerciseDetails : null;
    } catch (err) {
      console.error('Erro ao obter exercício por ID:', err);
      throw new Error('Erro ao obter exercício por ID');
    }
  }

  // Deletar um exercício
  async deleteExerciseDetail(id: number): Promise<boolean> {
    try {
      const [result] = await pool.execute('DELETE FROM exercise_details WHERE id = ?', [id]);
      const affectedRows = (result as { affectedRows: number }).affectedRows;
      return affectedRows > 0;
    } catch (err) {
      console.error('Erro ao deletar exercício:', err);
      throw new Error('Erro ao deletar exercício');
    }
  }
}

export default new ExerciseDetailsService();
