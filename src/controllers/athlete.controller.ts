import { Request, Response } from 'express'
import { AthleteService } from '../services/athlete.service'

export const AthleteController = {
  addAthlete: async (req: Request, res: Response): Promise<void> => {
    try {
      const { firstName, email } = req.body

      if (!firstName || !email) {
        res.status(400).json({ message: 'firstName e email são obrigatórios' })
        return
      }

      const newAthlete = await AthleteService.create({ firstName, email, status: 'active' })
      res.status(201).json(newAthlete)
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar atleta', error })
    }
  },

  getAllAthletes: async (req: Request, res: Response): Promise<void> => {
    try {
      const athletes = await AthleteService.getAll()
      res.json(athletes)
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar atletas', error })
    }
  }
}
