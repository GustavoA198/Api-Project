import express, {json} from 'express'
import cors from 'cors'

import { ResRouter } from './src/routes/res.route.js'
import { ClienteRouter } from './src/routes/cliente.route.js'
import { FincaRouter } from './src/routes/finca.route.js'
import { LoteRouter } from './src/routes/lote.route.js'
import { InsumoRouter } from './src/routes/insumo.route.js'
import { ActividadRouter } from './src/routes/actividad.route.js'
import { OcupacionRouter } from './src/routes/ocupacion.route.js'
import { ProductoRouter } from './src/routes/producto.route.js'
import { VentaRouter } from './src/routes/venta.route.js'
import { ProductoVentasRouter } from './src/routes/productosVentas.route.js'
import { AlimentoRouter } from './src/routes/alimento.route.js'
import { MuerteRouter } from './src/routes/muerte.route.js'
import { ProduccionIndividualRouter } from './src/routes/produccionIndividual.route.js'
import { ServicioRouter } from './src/routes/servicio.route.js'
import { MontaRouter } from './src/routes/monta.route.js'
import { InseminacionRouter } from './src/routes/inseminacion.route.js'

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
        login: '/login',
        cliente: '/cliente',
        finca: '/finca',
        lote: '/lote',
        insumo: '/insumo',
        actividad: '/actividad',
        ocupacion: '/ocupacion'
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
app.use('/ocupacion', OcupacionRouter)
app.use('/producto', ProductoRouter)
app.use('/venta', VentaRouter)
app.use('/productosVentas', ProductoVentasRouter)
app.use('/alimento', AlimentoRouter)
app.use('/muerte', MuerteRouter)
app.use('/produccionIndividual', ProduccionIndividualRouter)
app.use('/servicio', ServicioRouter)
app.use('/monta', MontaRouter)
app.use('/inseminacion', InseminacionRouter)

export default app
