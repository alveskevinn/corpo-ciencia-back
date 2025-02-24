import { Ficha } from '../models/ficha.model';
import pool from '../config/db.config';

class FichaService {
  async createFicha(athleteId: number, planFileUrl: string = '', progressFileUrl: string): Promise<Ficha> {
    const result = await pool.query(
      'INSERT INTO fichas (athlete_id, plan_file_url, progress_file_url, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [athleteId, planFileUrl, progressFileUrl]
    );
    return result.rows[0];
  }

  async getAllFichas(): Promise<Ficha[]> {
    const result = await pool.query('SELECT * FROM fichas');
    return result.rows;
  }

  async getFichaById(id: number): Promise<Ficha | null> {
    const result = await pool.query('SELECT * FROM fichas WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async deleteFicha(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM fichas WHERE id = $1', [id]);
    return result.rowCount > 0;
  }
}

export default new FichaService();
