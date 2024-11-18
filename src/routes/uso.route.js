import { Router } from 'express'
import { Autenticacion } from '../middlewares/autenticacion.js'
import { UsoController } from '../controllers/uso.controller.js'

export const UsoRouter = Router()

// GET
UsoRouter.get('/', Autenticacion, UsoController.getAll)
UsoRouter.get('/:id', UsoController.getUsoById)

// POST
UsoRouter.post('/', Autenticacion, UsoController.create)

// PUT
UsoRouter.put('/:id', Autenticacion, UsoController.update)

// DELETE
UsoRouter.delete('/:id', Autenticacion, UsoController.delete)
