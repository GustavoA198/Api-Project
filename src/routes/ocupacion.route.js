import { OcupacionController } from '../controllers/ocupacion.controller.js'
import { Autenticacion } from '../middlewares/autenticacion.js'
import { Router } from 'express'

export const OcupacionRouter = Router()

// GET
OcupacionRouter.get('/', Autenticacion, OcupacionController.getAll)
OcupacionRouter.get('/:id', Autenticacion, OcupacionController.getOcupacion)

// POST
OcupacionRouter.post('/', Autenticacion, OcupacionController.create)

// PUT
OcupacionRouter.put('/:id', Autenticacion, OcupacionController.update)

// DELETE
OcupacionRouter.delete('/:id', Autenticacion, OcupacionController.delete)
