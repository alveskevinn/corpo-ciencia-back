import { Ficha } from '../models/ficha.model';
import pool from '../config/db.config'; 

class FichaService {
  async createFicha(athleteId: number, planFileUrl: string = '', progressFileUrl: string): Promise<any> {
    try {
      const [result] = await pool.execute(
        'INSERT INTO fichas (athlete_id, plan_file_url, progress_file_url, created_at) VALUES (?, ?, ?, NOW())',
        [athleteId, planFileUrl, progressFileUrl]
      );

      const insertId = (result as { insertId: number }).insertId;

      return this.getFichaById(insertId);
    } catch (err) {
      console.error('Erro ao criar ficha:', err);
      throw new Error('Erro ao criar ficha');
    }
  }

  async getAllFichas(): Promise<Ficha[]> {
    try {
      const [rows] = await pool.execute('SELECT * FROM fichas');
      return rows as Ficha[];
    } catch (err) {
      console.error('Erro ao obter todas as fichas:', err);
      throw new Error('Erro ao obter todas as fichas');
    }
  }

  async getFichaById(id: number): Promise<Ficha | null> {
    try {
      const [rows] = await pool.execute('SELECT * FROM fichas WHERE id = ?', [id]);

      return Array.isArray(rows) && rows.length > 0 ? rows[0] as Ficha : null;
    } catch (err) {
      console.error('Erro ao obter ficha por ID:', err);
      throw new Error('Erro ao obter ficha por ID');
    }
  }

  async deleteFicha(id: number): Promise<boolean> {
    try {
      const [result] = await pool.execute('DELETE FROM fichas WHERE id = ?', [id]);

      const affectedRows = (result as { affectedRows: number }).affectedRows;
      return affectedRows > 0;
    } catch (err) {
      console.error('Erro ao deletar ficha:', err);
      throw new Error('Erro ao deletar ficha');
    }
  }
}

export default new FichaService();
