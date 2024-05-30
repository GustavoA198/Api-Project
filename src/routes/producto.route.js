import { Router } from 'express'
import { ProductoController } from '../controllers/producto.controller.js'

export const ProductoRouter = Router()

// GET
ProductoRouter.get('/', ProductoController.getAll)
ProductoRouter.get('/:id', ProductoController.getProducto)

// POST
ProductoRouter.post('/', ProductoController.create)

// PUT
ProductoRouter.put('/:id', ProductoController.update)

// DELETE
ProductoRouter.delete('/:id', ProductoController.delete)
