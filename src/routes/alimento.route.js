import { Router } from 'express'
import { Autenticacion } from '../middlewares/autenticacion.js'
import { AlimentoController } from '../controllers/alimento.controller.js'

export const AlimentoRouter = Router()

// GET
AlimentoRouter.get('/', Autenticacion, AlimentoController.getAll)
AlimentoRouter.get('/:id', Autenticacion, AlimentoController.getAlimento)

// POST
AlimentoRouter.post('/', Autenticacion, AlimentoController.create)

// PUT
AlimentoRouter.put('/:id', Autenticacion, AlimentoController.update)

// DELETE
AlimentoRouter.delete('/:id', Autenticacion, AlimentoController.delete)
