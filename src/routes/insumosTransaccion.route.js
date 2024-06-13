import { Router } from 'express'
import { InsumosTransaccionController } from '../controllers/insumosTransaccion.controller.js'

export const InsumosTransaccionRouter = Router()

// GET
InsumosTransaccionRouter.get('/', InsumosTransaccionController.getAll)
InsumosTransaccionRouter.get('/:id', InsumosTransaccionController.getInsumosTransaccion)

// POST
InsumosTransaccionRouter.post('/', InsumosTransaccionController.create)

// PUT
InsumosTransaccionRouter.put('/:id', InsumosTransaccionController.update)

// DELETE
InsumosTransaccionRouter.delete('/:id', InsumosTransaccionController.delete)
