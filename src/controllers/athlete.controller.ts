import { Request, Response } from 'express'
import { AthleteService } from '../services/athlete.service'

export const AthleteController = {
  addAthlete: (req: Request, res: Response) => {
    const { firstName, lastName, age, gender } = req.body
    const newAthlete = AthleteService.create({ firstName, lastName, age, gender })
    res.status(201).json(newAthlete)
  },

  getAllAthletes: (req: Request, res: Response) => {
    const athletes = AthleteService.getAll()
    res.json(athletes)
  }
}
