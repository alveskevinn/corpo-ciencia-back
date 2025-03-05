import pool from '../config/db.config'
import { Athlete } from '../models/athlete.model'

export const AthleteService = {
  create: async ({ firstName, email, status }: Omit<Athlete, 'id'>) => {
    const [result] = await pool.execute(
      'INSERT INTO athletes (firstname, email, status) VALUES (?, ?, ?) ',
      [firstName, email, status]
    )
    const id = (result as any).insertId
    return { id, firstName, email, status }
  },

  getAll: async (): Promise<Athlete[]> => {
    const [result] = await pool.execute('SELECT * FROM athletes')
    return result as Athlete[]
  },

  findByEmail: async (email: string): Promise<Athlete | null> => {
    const [result] = await pool.execute('SELECT * FROM athletes WHERE email = ? LIMIT 1', [email])
    return (result as Athlete[]).length > 0 ? (result as Athlete[])[0] : null
  },

  // Função getAthleteByEmail adicionada
  getAthleteByEmail: async (email: string): Promise<Athlete | null> => {
    const [result] = await pool.execute('SELECT * FROM athletes WHERE email = ? LIMIT 1', [email])
    return (result as Athlete[]).length > 0 ? (result as Athlete[])[0] : null
  },

  getByID: async (id: number): Promise<Athlete | null> => {
    const [result] = await pool.execute('SELECT * FROM athletes WHERE id = ?', [id])
    return (result as Athlete[])[0] || null
  },

  update: async (id: number, data: Partial<Omit<Athlete, 'id'>>) => {
    const { firstName, email, status } = data;

    const safeFirstName = firstName !== undefined ? firstName : null;
    const safeEmail = email !== undefined ? email : null;
    const safeStatus = status !== undefined ? status : null;

    const [result] = await pool.execute(
        'UPDATE athletes SET firstname = COALESCE(?, firstname), email = COALESCE(?, email), status = COALESCE(?, status) WHERE id = ?',
        [safeFirstName, safeEmail, safeStatus, id]
    );

    return (result as any).affectedRows > 0 ? { id, firstName, email, status } : null;
},


  delete: async (id: number) => {
    await pool.execute('DELETE FROM athletes WHERE id = ?', [id])
  }
}
