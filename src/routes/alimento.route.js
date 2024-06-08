import { Router } from 'express'
import { AlimentoController } from '../controllers/alimento.controller.js'

export const AlimentoRouter = Router()

// GET
AlimentoRouter.get('/', AlimentoController.getAll)
AlimentoRouter.get('/:id', AlimentoController.getAlimento)

// POST
AlimentoRouter.post('/', AlimentoController.create)

// PUT
AlimentoRouter.put('/:id', AlimentoController.update)

// DELETE
AlimentoRouter.delete('/:id', AlimentoController.delete)
