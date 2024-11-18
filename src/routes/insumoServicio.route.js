import { Router } from 'express'
import { Autenticacion } from '../middlewares/autenticacion.js'
import { InsumoController } from '../controllers/insumoServicio.controller.js'

export const InsumoServicioRouter = Router()

// GET
InsumoServicioRouter.get('/', Autenticacion, InsumoController.getAll)
InsumoServicioRouter.get('/:id', Autenticacion, InsumoController.getInsumoInsumoServicioById)
InsumoServicioRouter.get('/servicio/:id', Autenticacion, InsumoController.getInsumoInsumoServicioByIdServicio)

// PUT
InsumoServicioRouter.put('/', Autenticacion, InsumoController.update)

// DELETE
InsumoServicioRouter.delete('/', Autenticacion, InsumoController.delete)
