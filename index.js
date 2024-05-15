import express, {json} from 'express'
import { PORT } from './config.js'

import { ResRouter } from './src/routes/res.js'

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
// app.use('/api')
app.use('/res', ResRouter)

app.listen(PORT)
console.log(`Server is running on http://localhost:${PORT}`)

// Prueba
/* app.get('/prueba', (req, res) => {
  res.send('Hola mundo')
}) */
