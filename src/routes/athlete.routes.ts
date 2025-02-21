import { Router } from 'express'
import { AthleteController } from '../controllers/athlete.controller'

const router = Router()

router.post('/', AthleteController.addAthlete)
router.get('/', AthleteController.getAllAthletes)
router.get('/:id', AthleteController.getAthleteByID)
router.put('/:id', AthleteController.updateAthlete)
router.delete('/:id', AthleteController.deleteAthlete)

export default router
