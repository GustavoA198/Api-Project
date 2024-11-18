import { Router } from 'express'
import { Autenticacion } from '../middlewares/autenticacion.js'
import { LoteController } from '../controllers/lote.controller.js'

export const LoteRouter = Router()

// GET
LoteRouter.get('/', Autenticacion, LoteController.getAll)
LoteRouter.get('/:id', Autenticacion, LoteController.getLote)

// POST
LoteRouter.post('/', Autenticacion, LoteController.create)

// PUT
LoteRouter.put('/:id', Autenticacion, LoteController.update)

// DELETE
LoteRouter.delete('/:id', Autenticacion, LoteController.delete)
