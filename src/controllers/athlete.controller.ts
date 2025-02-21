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
  },

  getAthleteByID: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      const athlete = await AthleteService.getByID(Number(id))

      if (!athlete) {
        res.status(404).json({ message: 'Atleta não encontrado' })
        return
      }

      res.json(athlete)
    } catch (error) {
      res.status(500).json({message: 'Erro ao buscar atleta', error})
    }
  },

  updateAthlete: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      const updateAthele = await AthleteService.update(Number(id), req.body)

      if (!updateAthele) {
        res.status(404).json({message: 'Atleta não encontrado'})
        return
      }

      res.json(updateAthele)
    } catch (error) {
      res.status(500).json({ message: ' Erro ao atualizar atleta', error})
    }
  },

  deleteAthlete: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      await AthleteService.delete(Number(id))
      res.status(204).send() // 204 significa sem conteudo
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar atleta', error })
    }
  }
}
