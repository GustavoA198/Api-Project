import { Router } from 'express'
import { LoteController } from '../controllers/lote.controller.js'

export const LoteRouter = Router()

// GET
LoteRouter.get('/', LoteController.getAll)
LoteRouter.get('/:id', LoteController.getLote)

// POST
LoteRouter.post('/', LoteController.create)

// PUT
LoteRouter.put('/:id', LoteController.update)

// DELETE
LoteRouter.delete('/:id', LoteController.delete)
