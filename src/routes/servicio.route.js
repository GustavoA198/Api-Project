import { Router } from 'express'
import { Autenticacion } from '../middlewares/autenticacion.js'
import { ServicioController } from '../controllers/servicio.controller.js'

export const ServicioRouter = Router()

// GET
ServicioRouter.get('/', Autenticacion, ServicioController.getAll)
ServicioRouter.get('/inseminacionOmonta', Autenticacion, ServicioController.getAllInseminacionOMonta)
ServicioRouter.get('/secado', Autenticacion, ServicioController.getAllSecado)

ServicioRouter.get('/:id', Autenticacion, ServicioController.getServicio)
ServicioRouter.get('/inseminacionOmonta/:id', Autenticacion, ServicioController.getInseminacionOMontaById)

ServicioRouter.get('/res/:id', Autenticacion, ServicioController.getServicioByIdRes)
ServicioRouter.get('/res/inseminacionOmonta/:id', Autenticacion, ServicioController.getInseminacionOMontaByIdRes)
ServicioRouter.get('/res/secado/:id', Autenticacion, ServicioController.getSecadoByIdRes)

// POST
ServicioRouter.post('/', Autenticacion, ServicioController.create)

// PUT
ServicioRouter.put('/:id', Autenticacion, ServicioController.update)

// DELETE
ServicioRouter.delete('/:id', Autenticacion, ServicioController.delete)
