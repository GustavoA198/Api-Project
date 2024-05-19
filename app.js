import express, {json} from 'express'

import { ResRouter } from './src/routes/res.route.js'
import { ClienteRouter } from './src/routes/cliente.route.js'

const app = express()
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

export default app
