import { Router } from 'express'
import { InsumoController } from '../controllers/insumo.controller.js'

export const InsumoRouter = Router()

// GET
InsumoRouter.get('/', InsumoController.getAll)
InsumoRouter.get('/:id', InsumoController.getInsumo)

// POST
InsumoRouter.post('/', InsumoController.create)

// PUT
InsumoRouter.put('/:id', InsumoController.update)

// DELETE
InsumoRouter.delete('/:id', InsumoController.delete)
