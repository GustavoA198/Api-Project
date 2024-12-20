import { Router } from 'express'
import { ProduccionIndividualController } from '../controllers/produccionIndividual.controller.js'

export const ProduccionIndividualRouter = Router()

// GET
ProduccionIndividualRouter.get('/', ProduccionIndividualController.getAll)
ProduccionIndividualRouter.get('/:id', ProduccionIndividualController.getProduccionIndividual)
ProduccionIndividualRouter.get('/:id/:FechaInicio/:FechaFin', ProduccionIndividualController.getProduccionIndividualByFecha)

// POST
ProduccionIndividualRouter.post('/', ProduccionIndividualController.create)

// PUT
ProduccionIndividualRouter.put('/:id', ProduccionIndividualController.update)

// DELETE
ProduccionIndividualRouter.delete('/:id', ProduccionIndividualController.delete)
