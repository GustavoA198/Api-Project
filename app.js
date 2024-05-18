import express, {json} from 'express'
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
app.use('/res', ResRouter)

export default app
