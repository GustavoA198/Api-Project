import { Router } from 'express'
import { Autenticacion } from '../middlewares/autenticacion.js'
import { ActividadController } from '../controllers/actividad.controller.js'

export const ActividadRouter = Router()

// GET
ActividadRouter.get('/', Autenticacion, ActividadController.getAll)
ActividadRouter.get('/:id', Autenticacion, ActividadController.getActividad)

// POST
ActividadRouter.post('/', Autenticacion, ActividadController.create)

// PUT
ActividadRouter.put('/:id', Autenticacion, ActividadController.update)

// DELETE
ActividadRouter.delete('/:id', Autenticacion, ActividadController.delete)
