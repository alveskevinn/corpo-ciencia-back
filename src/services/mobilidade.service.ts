import { Mobilidade } from '../models/mobilidade.model'
import pool from '../config/db.config'

class MobilidadeService {
  async getAll(): Promise<Mobilidade[]> {
    const [rows] = await pool.execute('SELECT * FROM mobilidade')
    return rows as Mobilidade[]
  }

  async getById(id: number): Promise<Mobilidade | null> {
    const [rows] = await pool.execute('SELECT * FROM mobilidade WHERE id = ?', [id])
    return (rows as Mobilidade[])[0] || null
  }

  async create(data: Partial<Mobilidade>): Promise<Mobilidade> {
    const { name, video_url, regiao_trabalhada } = data;
  
    const query = `
      INSERT INTO mobilidade (name, video_url, regiao_trabalhada)
      VALUES (?, ?, ?)
    `;
  
    try {
      const [result] = await pool.execute(query, [
        name ?? null,
        video_url ?? null,
        regiao_trabalhada ?? null, // ✅ Incluído o parâmetro faltante
      ]);
  
      const insertedId = (result as any).insertId;
  
      const [rows] = await pool.execute('SELECT * FROM mobilidade WHERE id = ?', [insertedId]);
      return (rows as Mobilidade[])[0];
    } catch (error: any) {
      console.error('Erro ao criar mobilidade:', error);
  
      const message =
        error instanceof Error
          ? error.message
          : typeof error === 'string'
          ? error
          : JSON.stringify(error);
  
      throw new Error(`Erro ao criar mobilidade: ${message}`);
    }
  }
  

  async update(id: number, data: Partial<Mobilidade>): Promise<Mobilidade | null> {
    const { name, video_url } = data

    const query = `
      UPDATE mobilidade SET name = ?, video_url = ?, regiao_trabalhada = ? WHERE id = ?
    `
    const [result] = await pool.execute(query, [name ?? null, video_url ?? null, id])
    if ((result as any).affectedRows === 0) return null

    const [rows] = await pool.execute('SELECT * FROM mobilidade WHERE id = ?', [id])
    return (rows as Mobilidade[])[0] || null
  }

  async delete(id: number): Promise<boolean> {
    const [result] = await pool.execute('DELETE FROM mobilidade WHERE id = ?', [id])
    return (result as any).affectedRows > 0
  }
}

export default new MobilidadeService()
