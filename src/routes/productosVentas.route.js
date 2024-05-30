import { Router } from 'express'
import { ProductosVentasController } from '../controllers/productosVentas.controller.js'

export const ProductoVentasRouter = Router()

// GET
ProductoVentasRouter.get('/', ProductosVentasController.getAll)
ProductoVentasRouter.get('/:id', ProductosVentasController.getProductoVentas)

// POST
ProductoVentasRouter.post('/', ProductosVentasController.create)

// PUT
ProductoVentasRouter.put('/:id', ProductosVentasController.update)

// DELETE
ProductoVentasRouter.delete('/:id', ProductosVentasController.delete)
