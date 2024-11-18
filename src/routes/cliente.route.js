import { ClienteController } from '../controllers/cliente.controller.js'
import { Autenticacion } from '../middlewares/autenticacion.js'
import { Router } from 'express'

export const ClienteRouter = Router()

// GET
ClienteRouter.get('/', Autenticacion, ClienteController.getAll)
ClienteRouter.get('/:id', Autenticacion, ClienteController.getCliente)

// POST
ClienteRouter.post('/', Autenticacion, ClienteController.create)

// PUT
ClienteRouter.put('/:id', Autenticacion, ClienteController.update)

// DELETE
ClienteRouter.delete('/:id', Autenticacion, ClienteController.delete)
