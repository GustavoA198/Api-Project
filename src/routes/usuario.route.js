import { Router } from 'express'
import { UsuarioController } from '../controllers/usuario.controller.js'

export const UsuarioRouter = Router()

// GET
UsuarioRouter.get('/', UsuarioController.getAll)
UsuarioRouter.get('/:id', UsuarioController.getUsuario)

// POST
UsuarioRouter.post('/', UsuarioController.create)

// PUT
UsuarioRouter.put('/:id', UsuarioController.update)

// DELETE
UsuarioRouter.delete('/:id', UsuarioController.delete)
