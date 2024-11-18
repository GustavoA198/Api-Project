import { Router } from 'express'
import { Autenticacion } from '../middlewares/autenticacion.js'
import { FincaController } from '../controllers/finca.controller.js'

export const FincaRouter = Router()

// GET
FincaRouter.get('/', Autenticacion, FincaController.getAll)
FincaRouter.get('/:id', Autenticacion, FincaController.getFinca)

// POST
FincaRouter.post('/', Autenticacion, FincaController.create)

// PUT
FincaRouter.put('/:id', Autenticacion, FincaController.update)

// DELETE
FincaRouter.delete('/:id', Autenticacion, FincaController.delete)
