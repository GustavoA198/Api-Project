import { ProveedorController } from '../controllers/proveedor.controller.js'
import { Autenticacion } from '../middlewares/autenticacion.js'
import { Router } from 'express'

export const ProveedorRouter = Router()

// GET
ProveedorRouter.get('/', Autenticacion, ProveedorController.getAll)
ProveedorRouter.get('/:id', Autenticacion, ProveedorController.getProveedor)

// POST
ProveedorRouter.post('/', Autenticacion, ProveedorController.create)

// PUT
ProveedorRouter.put('/:id', Autenticacion, ProveedorController.update)

// DELETE
ProveedorRouter.delete('/:id', Autenticacion, ProveedorController.delete)
