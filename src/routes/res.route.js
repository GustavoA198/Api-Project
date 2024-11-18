import { Router } from 'express'
import { ResController } from '../controllers/res.controller.js'
import { Autenticacion } from '../middlewares/autenticacion.js'

export const ResRouter = Router()

// GET
ResRouter.get('/', Autenticacion, ResController.getAll)
ResRouter.get('/:id', ResController.getRes)
ResRouter.get('/hijos/:id', ResController.getHijos)

// POST
ResRouter.post('/', ResController.create)

// PUT
ResRouter.put('/:id', ResController.update)

// DELETE
ResRouter.delete('/:id', ResController.delete)
