import { Request, Response } from 'express'
import { AthleteService } from '../services/athlete.service'
import fichaService from '../services/ficha.service'

export const AthleteController = {
  addAthlete: async (req: Request, res: Response): Promise<void> => {
    try {
      const { firstName, email } = req.body

      if (!firstName || !email) {
        res.status(400).json({ message: 'firstName e email são obrigatórios' })
        return
      }

      const existingAthlete = await AthleteService.findByEmail(email)
      if (existingAthlete) {
        res.status(400).json({ message: 'E-mail já cadastrado' })
        return
      }

      const newAthlete = await AthleteService.create({
        firstName,
        email,
        status: 'active',
      })
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
      res.status(500).json({ message: 'Erro ao buscar atleta', error })
    }
  },

  updateAthlete: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const data = req.body;
  
      if (!data.firstName || !data.email || !data.status) {
        res.status(400).json({ message: 'Campos obrigatórios ausentes: firstName, email ou status' });
        return;
      }
  
      const updateAthele = await AthleteService.update(Number(id), data);
  
      if (!updateAthele) {
        res.status(404).json({ message: 'Atleta não encontrado' });
        return;
      }
  
      res.json(updateAthele);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar atleta', error });
    }
  },  

  deleteAthlete: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      await AthleteService.delete(Number(id))
      res.status(204).send() 
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar atleta', error })
    }
  },


  getFicha: async (req: Request, res: Response): Promise<void> => {
    try {
      const { athleteId } = req.params
      const ficha = await fichaService.getFichaById(Number(athleteId))

      if (!ficha) {
        res.status(404).json({ message: 'Ficha não encontrada' })
        return
      }

      res.json(ficha)
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar ficha', error })
    }
  },

  deleteFicha: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      await fichaService.deleteFicha(Number(id))
      res.status(204).send() 
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar ficha', error })
    }
  },
}
