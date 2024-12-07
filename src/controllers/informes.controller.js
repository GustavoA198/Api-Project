import { InformesModel } from '../models/informes.model.js'
import { error, success, notFound } from '../utils/responses.js'

export class InformesController {

  static async getResesPorFecha (req, res) {
    try {
      const { fechaInicio, fechaFin } = req.params
      const [all] = await InformesModel.getResesPorFecha(fechaInicio, fechaFin)
      if (!all || all.length === 0) {
        notFound(req, res, `No se encontró ninguna res entre ${fechaInicio} y ${fechaFin}`)
      } else {
        success(req, res, all, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async getNumeroResesPorFecha (req, res) {
    try {
      const { fechaInicio, fechaFin } = req.params
      const [all] = await InformesModel.getNumeroResesPorFecha(fechaInicio, fechaFin)
      if (!all || all.length === 0) {
        notFound(req, res, `No se encontró ninguna res entre ${fechaInicio} y ${fechaFin}`)
      } else {
        success(req, res, all, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async getDistribucionPorSexo (req, res) {
    try {
      const { fechaInicio, fechaFin } = req.params
      const [all] = await InformesModel.getDistribucionPorSexo(fechaInicio, fechaFin)
      if (!all || all.length === 0) {
        notFound(req, res, `No se encontró ninguna res entre ${fechaInicio} y ${fechaFin}`)
      } else {
        success(req, res, all, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async getDistribucionPorTipo (req, res) {
    try {
      const { fechaInicio, fechaFin } = req.params
      const [all] = await InformesModel.getDistribucionPorTipo(fechaInicio, fechaFin)
      if (!all || all.length === 0) {
        notFound(req, res, `No se encontró ninguna res entre ${fechaInicio} y ${fechaFin}`)
      } else {
        success(req, res, all, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async getDistribucionPorRaza (req, res) {
    try {
      const { fechaInicio, fechaFin } = req.params
      const [all] = await InformesModel.getDistribucionPorRaza(fechaInicio, fechaFin)
      if (!all || all.length === 0) {
        notFound(req, res, `No se encontró ninguna res entre ${fechaInicio} y ${fechaFin}`)
      } else {
        success(req, res, all, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async getDistribucionPorEdad (req, res) {
    try {
      const { fechaInicio, fechaFin } = req.params
      const [all] = await InformesModel.getDistribucionPorEdad(fechaInicio, fechaFin)
      if (!all || all.length === 0) {
        notFound(req, res, `No se encontró ninguna res entre ${fechaInicio} y ${fechaFin}`)
      } else {
        success(req, res, all, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }
}
