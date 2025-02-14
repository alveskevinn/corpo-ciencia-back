import { Router } from 'express'
import { AthleteController } from '../controllers/athlete.controller'

const router = Router()

router.post('/', AthleteController.addAthlete)
router.get('/', AthleteController.getAllAthletes)

export default router
