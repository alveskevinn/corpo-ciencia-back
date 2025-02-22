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
  }
}
