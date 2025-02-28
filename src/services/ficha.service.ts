import { Ficha } from '../models/ficha.model';
import pool from '../config/db.config'; 

class FichaService {
  async createFicha(athleteId: number, planFileUrl: string = '', progressFileUrl: string): Promise<Ficha> {
    const [result] = await pool.execute(
      'INSERT INTO fichas (athlete_id, plan_file_url, progress_file_url, created_at) VALUES (?, ?, ?, NOW())',
      [athleteId, planFileUrl, progressFileUrl]
    );

    const insertId = (result as any).insertId;

    return this.getFichaById(insertId);
  }

  async getAllFichas(): Promise<Ficha[]> {
    const [rows] = await pool.execute('SELECT * FROM fichas');
    return rows as Ficha[];
  }

  async getFichaById(id: number): Promise<Ficha | null> {
    const [rows] = await pool.execute('SELECT * FROM fichas WHERE id = ?', [id]);

    return Array.isArray(rows) && rows.length > 0 ? rows[0] as Ficha : null;
  }

  async deleteFicha(id: number): Promise<boolean> {
    const [result] = await pool.execute('DELETE FROM fichas WHERE id = ?', [id]);

    const affectedRows = (result as any).affectedRows;
    return affectedRows > 0; 
  }
}

export default new FichaService();
