import { Router } from 'express'
import { Autenticacion } from '../middlewares/autenticacion.js'
import { TransaccionController } from '../controllers/transaccion.controller.js'

export const TransaccionRouter = Router()

// GET
TransaccionRouter.get('/', Autenticacion, TransaccionController.getAll)
TransaccionRouter.get('/resumen', Autenticacion, TransaccionController.getResumen)
TransaccionRouter.get('/:id', Autenticacion, TransaccionController.getTransaccion)

// POST
TransaccionRouter.post('/', Autenticacion, TransaccionController.create)

// PUT
TransaccionRouter.put('/:id', Autenticacion, TransaccionController.update)

// DELETE
TransaccionRouter.delete('/:id', Autenticacion, TransaccionController.delete)
