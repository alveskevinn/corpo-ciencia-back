import pool from '../config/db.config'
import { Athlete } from '../models/athlete.model'

export const AthleteService = {
  create: async ({ firstName, email, status }: Omit<Athlete, 'id'>) => {
    const result = await pool.query(
      'INSERT INTO athletes (firstname, email, status) VALUES ($1, $2, $3) RETURNING *',
      [firstName, email, status]
    )
    return result.rows[0]
  },

  getAll: async (): Promise<Athlete[]> => {
    const result = await pool.query('SELECT * FROM athletes')
    return result.rows
  },

  findByEmail: async (email: string): Promise<Athlete | null> => {
    const result = await pool.query('SELECT * FROM athletes WHERE email = $1 LIMIT 1', [email])
    return result.rows.length > 0 ? result.rows[0] : null
  },
  getByID:async (id: number):Promise<Athlete | null> => {
    const result = await pool.query('SELECT * FROM athletes WHERE id = $1', [id])
    return result.rows[0] || null
  },

  update: async (id: number, data: Partial<Omit<Athlete, 'id'>>) => {
    const { firstName, email, status } = data
    const result = await pool.query(
      'UPDATE athletes SET firstname = COALESCE($1, firstname), email = COALESCE($2, email), status = COALESCE($3, status) WHERE id = $4 RETURNING *',
      [firstName, email, status, id]
    )
    return result.rows[0] 
  },

  delete: async (id: number)=> {
    await pool.query('DELETE FROM athletes WHERE id = $1', [id])
  }
}
