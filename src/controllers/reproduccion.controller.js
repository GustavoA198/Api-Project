import { ReproduccionModel } from '../models/reproduccion.model.js'
import { error, success, notContent } from '../utils/responses.js'

export class ReproduccionController {
  static async getEnGestacion (req, res) {
    try {
      const dataEnGestacion = await ReproduccionModel.getEnGestacion()
      if (!dataEnGestacion || dataEnGestacion.length === 0) {
        notContent(req, res, `No se encontró ningún Registro`)
      } else {
        success(req, res, dataEnGestacion, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async getParaSecado (req, res) {
    try {
      const dataParaSecado = await ReproduccionModel.getParaSecado()
      if (!dataParaSecado || dataParaSecado.length === 0) {
        notContent(req, res, `No se encontró ningún Registro`)
      } else {
        success(req, res, dataParaSecado, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async getPorConfirmar (req, res) {
    try {
      const [dataPorConfirmar] = await ReproduccionModel.getPorConfirmar()
      if (!dataPorConfirmar || dataPorConfirmar.length === 0) {
        notContent(req, res, `No se encontró ningún Registro`)
      } else {
        success(req, res, dataPorConfirmar, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async confirmarInseminacion (req, res) {
    try {
      const { id } = req.params
      const data = await ReproduccionModel.confirmarInseminacion(id)
      if (!data) {
        notContent(req, res, `No se encontró ningún Registro`)
      } else {
        success(req, res, data, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async inseminacionFallida (req, res) {
    try {
      const { id } = req.params
      const data = await ReproduccionModel.inseminacionFallida(id)
      if (!data) {
        notContent(req, res, `No se encontró ningún Registro`)
      } else {
        success(req, res, data, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async getPartos (req, res) {
    try {
      const [dataPartos] = await ReproduccionModel.getPartos()
      if (!dataPartos || dataPartos.length === 0) {
        notContent(req, res, `No se encontró ningún Registro`)
      } else {
        success(req, res, dataPartos, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }
}
