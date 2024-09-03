import { Router } from 'express'
import { UsoController } from '../controllers/uso.controller.js'

export const UsoRouter = Router()

// GET
UsoRouter.get('/', UsoController.getAll)
UsoRouter.get('/:id', UsoController.getUsoById)

// POST
UsoRouter.post('/', UsoController.create)

// PUT
UsoRouter.put('/:id', UsoController.update)

// DELETE
UsoRouter.delete('/:id', UsoController.delete)
