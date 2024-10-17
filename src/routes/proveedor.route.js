import { ProveedorController } from '../controllers/proveedor.controller.js'
import { Router } from 'express'

export const ProveedorRouter = Router()

// GET
ProveedorRouter.get('/', ProveedorController.getAll)
ProveedorRouter.get('/:id', ProveedorController.getProveedor)

// POST
ProveedorRouter.post('/', ProveedorController.create)

// PUT
ProveedorRouter.put('/:id', ProveedorController.update)

// DELETE
ProveedorRouter.delete('/:id', ProveedorController.delete)
