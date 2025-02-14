import { Athlete } from '../models/athlete.model'

const athletes: Athlete[] = []

export const AthleteService = {
  create: (athlete: Athlete): Athlete => {
    athletes.push(athlete)
    return athlete
  },

  getAll: (): Athlete[] => athletes
}
