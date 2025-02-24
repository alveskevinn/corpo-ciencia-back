import { Router } from 'express'
import { AthleteController } from '../controllers/athlete.controller'
import { authMiddleware } from '../middlewares/auth.middleware'  

const router = Router()

router.post('/', AthleteController.addAthlete)

router.get('/', authMiddleware, AthleteController.getAllAthletes)
router.get('/:id', authMiddleware, AthleteController.getAthleteByID)
router.put('/:id', authMiddleware, AthleteController.updateAthlete)
router.delete('/:id', authMiddleware, AthleteController.deleteAthlete)

export default router
