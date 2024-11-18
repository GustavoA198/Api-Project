import { Router } from 'express'
import { Autenticacion } from '../middlewares/autenticacion.js'
import { InsumosTransaccionController } from '../controllers/insumosTransaccion.controller.js'

export const InsumosTransaccionRouter = Router()

// GET
InsumosTransaccionRouter.get('/', Autenticacion, InsumosTransaccionController.getAll)
InsumosTransaccionRouter.get('/:id', Autenticacion, InsumosTransaccionController.getInsumosTransaccion)

// POST
InsumosTransaccionRouter.post('/', Autenticacion, InsumosTransaccionController.create)

// PUT
InsumosTransaccionRouter.put('/:id', Autenticacion, InsumosTransaccionController.update)

// DELETE
InsumosTransaccionRouter.delete('/:id', Autenticacion, InsumosTransaccionController.delete)
