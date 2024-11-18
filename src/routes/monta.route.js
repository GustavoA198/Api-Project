import { Router } from 'express'
import { Autenticacion } from '../middlewares/autenticacion.js'
import { MontaController } from '../controllers/monta.controller.js'

export const MontaRouter = Router()

// GET
MontaRouter.get('/', Autenticacion, MontaController.getAll)
MontaRouter.get('/:id', Autenticacion, MontaController.getMonta)

// POST
MontaRouter.post('/', Autenticacion, MontaController.create)

// PUT
MontaRouter.put('/:id', Autenticacion, MontaController.update)

// DELETE
MontaRouter.delete('/:id', Autenticacion, MontaController.delete)
