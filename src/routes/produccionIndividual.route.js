import { Router } from 'express'
import { Autenticacion } from '../middlewares/autenticacion.js'
import { ProduccionIndividualController } from '../controllers/produccionIndividual.controller.js'

export const ProduccionIndividualRouter = Router()

// GET
ProduccionIndividualRouter.get('/', Autenticacion, ProduccionIndividualController.getAll)
ProduccionIndividualRouter.get('/:id', Autenticacion, ProduccionIndividualController.getProduccionIndividual)

// POST
ProduccionIndividualRouter.post('/', Autenticacion, ProduccionIndividualController.create)

// PUT
ProduccionIndividualRouter.put('/:id', Autenticacion, ProduccionIndividualController.update)

// DELETE
ProduccionIndividualRouter.delete('/:id', Autenticacion, ProduccionIndividualController.delete)
