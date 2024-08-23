import { Router } from 'express'
import { ImagenController } from '../controllers/imagen.controller.js'
export const ImagenRouter = Router()

// Get imagen
ImagenRouter.get('/:resid', ImagenController.getAll)

ImagenRouter.get('/img/:imagen', ImagenController.getImagen)

// Create imagen
ImagenRouter.post('/', ImagenController.create)

// Delete imagen
ImagenRouter.delete('/:id', ImagenController.delete)
