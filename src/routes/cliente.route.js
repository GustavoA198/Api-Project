import { ClienteController } from '../controllers/cliente.controller.js'
import { Router } from 'express'

export const ClienteRouter = Router()

// GET
ClienteRouter.get('/', ClienteController.getAll)
ClienteRouter.get('/:id', ClienteController.getCliente)

// POST
ClienteRouter.post('/', ClienteController.create)

// PUT
ClienteRouter.put('/:id', ClienteController.update)

// DELETE
ClienteRouter.delete('/:id', ClienteController.delete)
