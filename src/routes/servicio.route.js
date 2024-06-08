import { Router } from 'express'
import { ServicioController } from '../controllers/servicio.controller.js'

export const ServicioRouter = Router()

// GET
ServicioRouter.get('/', ServicioController.getAll)
ServicioRouter.get('/:id', ServicioController.getServicio)

// POST
ServicioRouter.post('/', ServicioController.create)

// PUT
ServicioRouter.put('/:id', ServicioController.update)

// DELETE
ServicioRouter.delete('/:id', ServicioController.delete)
