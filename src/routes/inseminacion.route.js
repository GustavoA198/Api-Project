import { Router } from 'express'
import { Autenticacion } from '../middlewares/autenticacion.js'
import { InseminacionController } from '../controllers/inseminacion.controller.js'

export const InseminacionRouter = Router()

// GET
InseminacionRouter.get('/', Autenticacion, InseminacionController.getAll)
InseminacionRouter.get('/:id', Autenticacion, InseminacionController.getInseminacion)

// POST
InseminacionRouter.post('/', Autenticacion, InseminacionController.create)

// PUT
InseminacionRouter.put('/:id', Autenticacion, InseminacionController.update)

// DELETE
InseminacionRouter.delete('/:id', Autenticacion, InseminacionController.delete)
