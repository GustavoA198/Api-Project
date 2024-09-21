import { ParaInseminarController } from '../controllers/paraInseminar.controller.js'
import { Router } from 'express'

export const ParaInseminarRouter = Router()

// GET
ParaInseminarRouter.get('/', ParaInseminarController.getAll)
ParaInseminarRouter.get('/id/:id', ParaInseminarController.getParaInseminar)
ParaInseminarRouter.get('/sugeridos', ParaInseminarController.getSugeridos)

// POST
ParaInseminarRouter.post('/', ParaInseminarController.create)

// PUT
ParaInseminarRouter.put('/:id', ParaInseminarController.update)

// DELETE
ParaInseminarRouter.delete('/:id', ParaInseminarController.delete)
