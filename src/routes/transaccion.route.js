import { Router } from 'express'
import { TransaccionController } from '../controllers/transaccion.controller.js'

export const TransaccionRouter = Router()

// GET
TransaccionRouter.get('/', TransaccionController.getAll)
TransaccionRouter.get('/resumen', TransaccionController.getResumen)
TransaccionRouter.get('/:id', TransaccionController.getTransaccion)
TransaccionRouter.get('/fechas/:FechaInicio/:FechaFin', TransaccionController.getTransaccionByFecha)

// POST
TransaccionRouter.post('/', TransaccionController.create)

// PUT
TransaccionRouter.put('/:id', TransaccionController.update)

// DELETE
TransaccionRouter.delete('/:id', TransaccionController.delete)
