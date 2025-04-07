import pool from '../config/db.config'

class TecnicaService {
  async getAll(): Promise<any[]> {
    const [rows] = await pool.execute('SELECT * FROM tecnicas')
    return rows as any[]
  }

  async getById(id: number): Promise<any | null> {
    const [rows] = await pool.execute('SELECT * FROM tecnicas WHERE id = ?', [
      id,
    ])
    return (rows as any[])[0] || null
  }

  async create(data: Partial<any>): Promise<any> {
    const { nome, descricao, video } = data

    const query = `INSERT INTO tecnicas (nome, descricao, video) VALUES (?, ?, ?)`
    const [result] = await pool.execute(query, [nome, descricao, video ?? null])
    const insertedId = (result as any).insertId

    const [rows] = await pool.execute('SELECT * FROM tecnicas WHERE id = ?', [
      insertedId,
    ])
    return (rows as any[])[0]
  }

  async update(id: number, data: Partial<any>): Promise<any | null> {
    const { nome, descricao, video } = data

    const query = `UPDATE tecnicas SET nome = ?, descricao = ?, video = ? WHERE id = ?`
    const values = [nome ?? null, descricao ?? null, video ?? null, id]

    const [result] = await pool.execute(query, values)

    if ((result as any).affectedRows === 0) return null

    const [rows] = await pool.execute('SELECT * FROM tecnicas WHERE id = ?', [
      id,
    ])
    return (rows as any[])[0] || null
  }

  async delete(id: number): Promise<boolean> {
    const [result] = await pool.execute('DELETE FROM tecnicas WHERE id = ?', [
      id,
    ])
    return (result as any).affectedRows > 0
  }
}

export default new TecnicaService()
