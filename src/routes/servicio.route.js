import { Router } from 'express'
import { ServicioController } from '../controllers/servicio.controller.js'

export const ServicioRouter = Router()

// GET
ServicioRouter.get('/', ServicioController.getAll)
ServicioRouter.get('/:id', ServicioController.getServicio)
ServicioRouter.get('/res/:id', ServicioController.getServicioByIdRes)
ServicioRouter.get('/res/inseminacionOmonta/:id', ServicioController.getInseminacionOMontaByIdRes)
ServicioRouter.get('/res/secado/:id', ServicioController.getSecadoByIdRes)

// POST
ServicioRouter.post('/', ServicioController.create)

// PUT
ServicioRouter.put('/:id', ServicioController.update)

// DELETE
ServicioRouter.delete('/:id', ServicioController.delete)
