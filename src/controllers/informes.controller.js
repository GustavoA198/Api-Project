import { InformesModel } from '../models/informes.model.js'
import { error, success, notFound } from '../utils/responses.js'

export class InformesController {

  /* sección inicial */
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

  static async getNumeroNacimientosPorFecha (req, res) {
    try {
      const { fechaInicio, fechaFin } = req.params
      const [all] = await InformesModel.getNumeroNacimientosPorFecha(fechaInicio, fechaFin)
      if (!all || all.length === 0) {
        notFound(req, res, `No se encontró ningún nacimiento entre ${fechaInicio} y ${fechaFin}`)
      } else {
        success(req, res, all, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async getProduccionTotalPorTipo (req, res) {
    try {
      const { fechaInicio, fechaFin, tipo } = req.params
      const [all] = await InformesModel.getProduccionTotalPorTipo(fechaInicio, fechaFin, tipo)
      if (!all || all.length === 0) {
        notFound(req, res, `No se encontró ninguna producción de tipo ${tipo} entre ${fechaInicio} y ${fechaFin}`)
      } else {
        success(req, res, all, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

/* seccion de las graficas */

  static async getProduccionLechePorFecha (req, res) {
    try {
      const { fechaInicio, fechaFin } = req.params
      const [all] = await InformesModel.getProduccionLechePorFecha(fechaInicio, fechaFin)
      if (!all || all.length === 0) {
        notFound(req, res, `No se encontró ninguna producción de leche entre ${fechaInicio} y ${fechaFin}`)
      } else {
        success(req, res, all, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async getBalancePorFecha (req, res) {
    try {
      const { fechaInicio, fechaFin } = req.params
      const [all] = await InformesModel.getBalancePorFecha(fechaInicio, fechaFin)
      if (!all || all.length === 0) {
        notFound(req, res, `No se encontró ningún balance entre ${fechaInicio} y ${fechaFin}`)
      } else {
        success(req, res, all, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

/* sección final */
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
