import { Router } from 'express'
import { InformesController } from '../controllers/informes.controller.js'

export const InformesRouter = Router()

// GET
InformesRouter.get('/getResesPorFecha/:fechaInicio/:fechaFin', InformesController.getResesPorFecha)
InformesRouter.get('/getNumeroResesPorFecha/:fechaInicio/:fechaFin', InformesController.getNumeroResesPorFecha)
InformesRouter.get('/getDistribucionPorSexo/:fechaInicio/:fechaFin', InformesController.getDistribucionPorSexo)
InformesRouter.get('/getDistribucionPorTipo/:fechaInicio/:fechaFin', InformesController.getDistribucionPorTipo)
InformesRouter.get('/getDistribucionPorRaza/:fechaInicio/:fechaFin', InformesController.getDistribucionPorRaza)
InformesRouter.get('/getDistribucionPorEdad/:fechaInicio/:fechaFin', InformesController.getDistribucionPorEdad)
