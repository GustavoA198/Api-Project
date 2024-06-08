import { Router } from 'express'
import { MontaController } from '../controllers/monta.controller.js'

export const MontaRouter = Router()

// GET
MontaRouter.get('/', MontaController.getAll)
MontaRouter.get('/:id', MontaController.getMonta)

// POST
MontaRouter.post('/', MontaController.create)

// PUT
MontaRouter.put('/:id', MontaController.update)

// DELETE
MontaRouter.delete('/:id', MontaController.delete)
