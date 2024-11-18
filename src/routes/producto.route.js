import { Router } from 'express'
import { Autenticacion } from '../middlewares/autenticacion.js'
import { ProductoController } from '../controllers/producto.controller.js'

export const ProductoRouter = Router()

// GET
ProductoRouter.get('/', Autenticacion, ProductoController.getAll)
ProductoRouter.get('/:id', Autenticacion, ProductoController.getProducto)

// POST
ProductoRouter.post('/', Autenticacion, ProductoController.create)

// PUT
ProductoRouter.put('/:id', Autenticacion, ProductoController.update)

// DELETE
ProductoRouter.delete('/:id', Autenticacion, ProductoController.delete)
