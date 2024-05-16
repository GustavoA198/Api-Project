import { Router } from 'express'
import { ResController } from '../controllers/res.controller.js'

export const ResRouter = Router()

// GET
ResRouter.get('/', ResController.getAll)

// POST
ResRouter.post('/', ResController.create)