import { Router } from 'express'
import { Autenticacion } from '../middlewares/autenticacion.js'
import { ImagenController } from '../controllers/imagen.controller.js'
export const ImagenRouter = Router()

// Get imagen
ImagenRouter.get('/:resid', Autenticacion, ImagenController.getAll)

ImagenRouter.get('/img/:imagen', Autenticacion, ImagenController.getImagenByName)

ImagenRouter.get('/id/:resid', Autenticacion, ImagenController.getImagenById)

// Create imagen
ImagenRouter.post('/', Autenticacion, ImagenController.create)

// Delete imagen
ImagenRouter.delete('/:id', Autenticacion, ImagenController.delete)
