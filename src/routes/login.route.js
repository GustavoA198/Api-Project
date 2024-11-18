import { Router } from 'express'
import { Login } from '../controllers/login.controller.js'

export const LoginRouter = Router()

// POST
LoginRouter.post('/', Login.login)
