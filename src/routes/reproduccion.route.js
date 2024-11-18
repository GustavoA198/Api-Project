import { ReproduccionController } from '../controllers/reproduccion.controller.js'
import { Autenticacion } from '../middlewares/autenticacion.js'
import { Router } from 'express'

export const ReproduccionRouter = Router()

// GET
ReproduccionRouter.get('/engestacion', Autenticacion, ReproduccionController.getEnGestacion)
ReproduccionRouter.get('/porConfirmar', Autenticacion, ReproduccionController.getPorConfirmar)
ReproduccionRouter.get('/partos', Autenticacion, ReproduccionController.getPartos)
ReproduccionRouter.get('/parasecado', Autenticacion, ReproduccionController.getParaSecado)

ReproduccionRouter.put('/confirmarinseminacion/:id', Autenticacion, ReproduccionController.confirmarInseminacion)
ReproduccionRouter.put('/inseminacionfallida/:id', Autenticacion, ReproduccionController.inseminacionFallida)
