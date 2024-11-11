import { InsumosServicioModel } from '../models/insumoServicio.model.js'
import { validateInsumoServicio, validateInsumoServicioDelete } from '../schemas/insumoServicio.schema.js'
import { error, success, notContent } from '../utils/responses.js'

export class InsumoController {
  static async getAll (req, res) {
    try {
      const [all] = await InsumosServicioModel.getAll()
      success(req, res, all, 200)
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async getInsumoInsumoServicioById (req, res) {
    try {
      const [Insumo] = await InsumosServicioModel.getInsumosServicioById(req.params.id)
      if (!Insumo || Insumo.length === 0) {
        notContent(req, res, `No se encontró ningún insumo con el ID ${req.params.id}`)
      } else {
        success(req, res, Insumo, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async getInsumoInsumoServicioByIdServicio (req, res) {
    try {
      const [Insumo] = await InsumosServicioModel.getInsumosServicioByIdServicio(req.params.id)
      if (!Insumo || Insumo.length === 0) {
        notContent(req, res, `No se encontró ningún insumo con el ID ${req.params.id}`)
      } else {
        success(req, res, Insumo, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async update (req, res) {
    const result = validateInsumoServicio(req.body)
    if (result.success) {
      try {
        const updateResult = await InsumosServicioModel.update(result.data)
        if (!updateResult) {
          notContent(req, res, `No se encontro ningún insumo con el ID ${req.params.id} para actualizar`)
        } else {
          success(req, res, updateResult, 200)
        }
      } catch (e) {
        error(req, res, e.message, e.status)
      }
    } else {
      error(req, res, JSON.parse(result.error.message), 400)
    }
  }

  static async delete (req, res) {
    const result = validateInsumoServicioDelete(req.body)
    if (!result.success) {
      error(req, res, JSON.parse(result.error.message), 400)
      return
    }

    try {
      const deleted = await InsumosServicioModel.delete(result.data)
      if (!deleted) {
        notContent(req, res, `No se encontro ningún insumo con el ID ${req.params.id} para eliminar`)
      } else {
        success(req, res, deleted, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }
}
