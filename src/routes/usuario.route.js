import { Router } from 'express'
import { Autenticacion } from '../middlewares/autenticacion.js'
import { UsuarioController } from '../controllers/usuario.controller.js'

export const UsuarioRouter = Router()

// GET
UsuarioRouter.get('/', Autenticacion, UsuarioController.getAll)
UsuarioRouter.get('/:id', Autenticacion, UsuarioController.getUsuario)

// POST
UsuarioRouter.post('/', UsuarioController.create)

// PUT
UsuarioRouter.put('/:id', Autenticacion, UsuarioController.update)

// DELETE
UsuarioRouter.delete('/:id', Autenticacion, UsuarioController.delete)
