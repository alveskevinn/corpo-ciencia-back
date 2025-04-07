import express from 'express'
import { TecnicaController } from '../controllers/tecnica.controller'
import { authMiddleware } from '../middlewares/auth.middleware'
import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer({ storage })

const router = express.Router()

router.get('/', authMiddleware, TecnicaController.getAll)
router.get('/:id', authMiddleware, TecnicaController.getById)
router.post('/', authMiddleware, upload.single('video'), TecnicaController.create)
router.put('/:id', authMiddleware, upload.single('video'), TecnicaController.update)
router.delete('/:id', authMiddleware, TecnicaController.delete)

export default router
