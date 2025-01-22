import { Router } from 'express'
import { InformesController } from '../controllers/informes.controller.js'
import { Autenticacion } from '../middlewares/autenticacion.js'

export const InformesRouter = Router()

// GET
/* sección inicial */
InformesRouter.get('/getResesPorFecha/:fechaInicio/:fechaFin', Autenticacion, InformesController.getResesPorFecha)
InformesRouter.get('/getNumeroResesPorFecha/:fechaInicio/:fechaFin', Autenticacion, InformesController.getNumeroResesPorFecha)
InformesRouter.get('/getNumeroNacimientosPorFecha/:fechaInicio/:fechaFin', Autenticacion, InformesController.getNumeroNacimientosPorFecha)
InformesRouter.get('/getProduccionTotalPorTipo/:fechaInicio/:fechaFin/:tipo', Autenticacion, InformesController.getProduccionTotalPorTipo)

/* graficas */
InformesRouter.get('/getProduccionLechePorFecha/:fechaInicio/:fechaFin', Autenticacion, InformesController.getProduccionLechePorFecha)
InformesRouter.get('/getBalancePorFecha/:fechaInicio/:fechaFin', Autenticacion, InformesController.getBalancePorFecha)

/* sección final */
InformesRouter.get('/getDistribucionPorSexo/:fechaInicio/:fechaFin', Autenticacion, InformesController.getDistribucionPorSexo)
InformesRouter.get('/getDistribucionPorTipo/:fechaInicio/:fechaFin', Autenticacion, InformesController.getDistribucionPorTipo)
InformesRouter.get('/getDistribucionPorRaza/:fechaInicio/:fechaFin', Autenticacion, InformesController.getDistribucionPorRaza)
InformesRouter.get('/getDistribucionPorEdad/:fechaInicio/:fechaFin', Autenticacion, InformesController.getDistribucionPorEdad)
