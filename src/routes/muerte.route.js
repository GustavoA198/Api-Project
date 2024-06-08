import { Router } from 'express'
import { MuerteController } from '../controllers/muerte.controller.js'

export const MuerteRouter = Router()

// GET
MuerteRouter.get('/', MuerteController.getAll)
MuerteRouter.get('/:id', MuerteController.getMuerte)

// POST
MuerteRouter.post('/', MuerteController.create)

// PUT
MuerteRouter.put('/:id', MuerteController.update)

// DELETE
MuerteRouter.delete('/:id', MuerteController.delete)
