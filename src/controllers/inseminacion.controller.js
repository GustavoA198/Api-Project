import { InseminacionModel } from '../models/inseminacion.model.js'
import { validateInseminacion, validatePartialInseminacion } from '../schemas/inseminacion.schema.js'
import { error, success, notFound } from '../utils/responses.js'

export class InseminacionController {
  static async getAll (req, res) {
    try {
      const [all] = await InseminacionModel.getInseminaciones()
      success(req, res, all, 200)
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async getInseminacion (req, res) {
    try {
      const [Inseminacion] = await InseminacionModel.getInseminacionById(req.params.id)
      if (!Inseminacion || Inseminacion.length === 0) {
        notFound(req, res, `No se encontró ninguna inseminacion con el ID ${req.params.id}`)
      } else {
        success(req, res, Inseminacion, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async create (req, res) {
    const result = validateInseminacion(req.body)
    if (result.success) {
      try {
        const added = await InseminacionModel.createInseminacion(result.data)
        success(req, res, added, 200)
      } catch (e) {
        error(req, res, e.message, e.status)
      }
    } else {
      error(req, res, JSON.parse(result.error.message), 400)
    }
  }

  static async update (req, res) {
    const result = validatePartialInseminacion(req.body)
    if (result.success) {
      try {
        const [updateResult] = await InseminacionModel.updateInseminacion(req.params.id, result.data)
        if (updateResult.affectedRows === 0 || updateResult.affectedRows === undefined) {
          notFound(req, res, `No se encontro ninguna inseminacion con el ID ${req.params.id} para actualizar`)
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
    try {
      const [deleted] = await InseminacionModel.deleteInseminacion(req.params.id)
      if (deleted.affectedRows === 0) {
        notFound(req, res, `No se encontro ninguna inseminacion con el ID ${req.params.id} para borrar`)
      } else {
        success(req, res, deleted, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }
}
