import { Router } from 'express'
import { VentaController } from '../controllers/venta.controller.js'

export const VentaRouter = Router()

// GET
VentaRouter.get('/', VentaController.getAll)
VentaRouter.get('/:id', VentaController.getVenta)

// POST
VentaRouter.post('/', VentaController.create)

// PUT
VentaRouter.put('/:id', VentaController.update)

// DELETE
VentaRouter.delete('/:id', VentaController.delete)
