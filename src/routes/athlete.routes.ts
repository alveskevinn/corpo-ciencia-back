import { Router } from 'express'
import { AthleteController } from '../controllers/athlete.controller'
import multer from 'multer';
import { authMiddleware } from '../middlewares/auth.middleware'  

const router = Router()
const upload = multer(); 

router.post('/', AthleteController.addAthlete)

router.get('/', authMiddleware, AthleteController.getAllAthletes)
router.get('/:id', authMiddleware, AthleteController.getAthleteByID)
router.put('/:id', authMiddleware, AthleteController.updateAthlete)
router.delete('/:id', authMiddleware, AthleteController.deleteAthlete)
// router.post('/upload', upload.fields([{ name: 'planFile' }, { name: 'progressFile' }]), AthleteController.uploadFiles);

export default router
