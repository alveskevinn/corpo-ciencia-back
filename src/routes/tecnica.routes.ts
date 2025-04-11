import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import multer from 'multer'
import tecnicaController from '../controllers/tecnica.controller'

const storage = multer.memoryStorage()
const upload = multer({ storage })

const router = express.Router()

router.get('/', authMiddleware, tecnicaController.getAll)
router.get('/:id', authMiddleware, tecnicaController.getById)
router.post('/', authMiddleware, upload.single('video'), tecnicaController.create)
router.put('/:id', authMiddleware, upload.single('video'), tecnicaController.update)
router.delete('/:id', authMiddleware, tecnicaController.delete)

export default router
