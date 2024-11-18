import { Router } from 'express'
import { Autenticacion } from '../middlewares/autenticacion.js'
import { InsumoController } from '../controllers/insumo.controller.js'

export const InsumoRouter = Router()

// GET
InsumoRouter.get('/', Autenticacion, InsumoController.getAll)
InsumoRouter.get('/:id', Autenticacion, InsumoController.getInsumo)

// POST
InsumoRouter.post('/', Autenticacion, InsumoController.create)

// PUT
InsumoRouter.put('/:id', Autenticacion, InsumoController.update)

// DELETE
InsumoRouter.delete('/:id', Autenticacion, InsumoController.delete)
