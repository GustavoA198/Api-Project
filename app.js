import express, {json} from 'express'

import { ResRouter } from './src/routes/res.route.js'
import { ClienteRouter } from './src/routes/cliente.route.js'
import { FincaRouter } from './src/routes/finca.route.js'
import { LoteRouter } from './src/routes/lote.route.js'
import { InsumoRouter } from './src/routes/insumo.route.js'
import { ActividadRouter } from './src/routes/actividad.route.js'
import cors from 'cors'

const app = express()

app.use(cors())

app.use(json())
app.get('/', (req, res) => {
  res.json(
    {
      title: 'API for Pro Ganadero',
      endpoints: {
        res: '/res',
        register: '/register',
        login: '/login'
      }
    })
})

// Routes
app.use('/res', ResRouter)
app.use('/cliente', ClienteRouter)
app.use('/finca', FincaRouter)
app.use('/lote', LoteRouter)
app.use('/insumo', InsumoRouter)
app.use('/actividad', ActividadRouter)

export default app
