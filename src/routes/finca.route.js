import { Router } from 'express'
import { FincaController } from '../controllers/finca.controller.js'

export const FincaRouter = Router()

// GET
FincaRouter.get('/', FincaController.getAll)
FincaRouter.get('/:id', FincaController.getFinca)

// POST
FincaRouter.post('/', FincaController.create)

// PUT
FincaRouter.put('/:id', FincaController.update)

// DELETE
FincaRouter.delete('/:id', FincaController.delete)
