import { Router } from 'express'
import { ResController } from '../controllers/res.controller.js'
import { Autenticacion } from '../middlewares/autenticacion.js'

export const ResRouter = Router()

// GET
ResRouter.get('/', Autenticacion, ResController.getAll)
ResRouter.get('/:id', Autenticacion, ResController.getRes)
ResRouter.get('/hijos/:id', Autenticacion, ResController.getHijos)

// POST
ResRouter.post('/', Autenticacion, ResController.create)

// PUT
ResRouter.put('/:id', Autenticacion, ResController.update)

// DELETE
ResRouter.delete('/:id', Autenticacion, ResController.delete)
