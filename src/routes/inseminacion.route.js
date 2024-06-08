import { Router } from 'express'
import { InseminacionController } from '../controllers/inseminacion.controller.js'

export const InseminacionRouter = Router()

// GET
InseminacionRouter.get('/', InseminacionController.getAll)
InseminacionRouter.get('/:id', InseminacionController.getInseminacion)

// POST
InseminacionRouter.post('/', InseminacionController.create)

// PUT
InseminacionRouter.put('/:id', InseminacionController.update)

// DELETE
InseminacionRouter.delete('/:id', InseminacionController.delete)
