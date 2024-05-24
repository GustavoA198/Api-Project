import { Router } from 'express'
import { ActividadController } from '../controllers/actividad.controller.js'

export const ActividadRouter = Router()

// GET
ActividadRouter.get('/', ActividadController.getAll)
ActividadRouter.get('/:id', ActividadController.getActividad)

// POST
ActividadRouter.post('/', ActividadController.create)

// PUT
ActividadRouter.put('/:id', ActividadController.update)

// DELETE
ActividadRouter.delete('/:id', ActividadController.delete)
