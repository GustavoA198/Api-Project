import { OcupacionController } from '../controllers/ocupacion.controller.js'
import { Router } from 'express'

export const OcupacionRouter = Router()

// GET
OcupacionRouter.get('/', OcupacionController.getAll)
OcupacionRouter.get('/:id', OcupacionController.getOcupacion)

// POST
OcupacionRouter.post('/', OcupacionController.create)

// PUT
OcupacionRouter.put('/:id', OcupacionController.update)

// DELETE
OcupacionRouter.delete('/:id', OcupacionController.delete)
