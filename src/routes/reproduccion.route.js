import { ReproduccionController } from '../controllers/reproduccion.controller.js'
import { Router } from 'express'

export const ReproduccionRouter = Router()

// GET
ReproduccionRouter.get('/engestacion', ReproduccionController.getEnGestacion)
ReproduccionRouter.get('/porConfirmar', ReproduccionController.getPorConfirmar)
ReproduccionRouter.get('/partos', ReproduccionController.getPartos)

ReproduccionRouter.put('/confirmarinseminacion/:id', ReproduccionController.confirmarInseminacion)
ReproduccionRouter.put('/inseminacionfallida/:id', ReproduccionController.inseminacionFallida)
