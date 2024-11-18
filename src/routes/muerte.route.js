import { Router } from 'express'
import { Autenticacion } from '../middlewares/autenticacion.js'
import { MuerteController } from '../controllers/muerte.controller.js'

export const MuerteRouter = Router()

// GET
MuerteRouter.get('/', Autenticacion, MuerteController.getAll)
MuerteRouter.get('/:id', Autenticacion, MuerteController.getMuerte)

// POST
MuerteRouter.post('/', Autenticacion, MuerteController.create)

// PUT
MuerteRouter.put('/:id', Autenticacion, MuerteController.update)

// DELETE
MuerteRouter.delete('/:id', Autenticacion, MuerteController.delete)
