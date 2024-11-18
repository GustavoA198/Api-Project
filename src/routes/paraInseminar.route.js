import { ParaInseminarController } from '../controllers/paraInseminar.controller.js'
import { Autenticacion } from '../middlewares/autenticacion.js'
import { Router } from 'express'

export const ParaInseminarRouter = Router()

// GET
ParaInseminarRouter.get('/', Autenticacion, ParaInseminarController.getAll)
ParaInseminarRouter.get('/id/:id', Autenticacion, ParaInseminarController.getParaInseminar)
ParaInseminarRouter.get('/sugeridos', Autenticacion, ParaInseminarController.getSugeridos)

// POST
ParaInseminarRouter.post('/', Autenticacion, ParaInseminarController.create)

// PUT
ParaInseminarRouter.put('/:id', Autenticacion, ParaInseminarController.update)

// DELETE
ParaInseminarRouter.delete('/:id', Autenticacion, ParaInseminarController.delete)
