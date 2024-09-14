import { Router } from 'express'
import { InsumoController } from '../controllers/insumoServicio.controller.js'

export const InsumoServicioRouter = Router()

// GET
InsumoServicioRouter.get('/', InsumoController.getAll)
InsumoServicioRouter.get('/:id', InsumoController.getInsumoInsumoServicioById)
InsumoServicioRouter.get('/servicio/:id', InsumoController.getInsumoInsumoServicioByIdServicio)

// PUT
InsumoServicioRouter.put('/', InsumoController.update)

// DELETE
InsumoServicioRouter.delete('/', InsumoController.delete)
