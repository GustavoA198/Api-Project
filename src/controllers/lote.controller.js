import { LoteModel } from '../models/lote.model.js'
import { validateLote, validatePartialLote } from '../schemas/lote.schema.js'
import { error, success, notFound } from '../utils/responses.js'

export class LoteController {
  static async getAll (req, res) {
    try {
      const [all] = await LoteModel.getAll()
      success(req, res, all, 200)
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async getLote (req, res) {
    try {
      const [Lote] = await LoteModel.getLote(req.params.id)
      if (!Lote || Lote.length === 0) {
        notFound(req, res, `No se encontró ningún lote con el ID ${req.params.id}`)
      } else {
        success(req, res, Lote, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async create (req, res) {
    const result = validateLote(req.body)
    if (result.success) {
      try {
        const added = await LoteModel.create(result.data)
        success(req, res, added, 200)
      } catch (e) {
        error(req, res, e.message, e.status)
      }
    } else {
      error(req, res, JSON.parse(result.error.message), 400)
    }
  }

  static async update (req, res) {
    const result = validatePartialLote(req.body)
    if (result.success) {
      try {
        const [updateResult] = await LoteModel.update(req.params.id, result.data)
        if (updateResult.affectedRows === 0) {
          notFound(req, res, `No se encontro ningún lote con el ID ${req.params.id} para actualizar`)
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
      const deleted = await LoteModel.delete(req.params.id)
      if (deleted.affectedRows === 0 || deleted.affectedRows === undefined) {
        notFound(req, res, `No se encontro ningún lote con el ID ${req.params.id} para eliminar`)
      } else {
        success(req, res, `Lote con ID ${req.params.id} eliminado`, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }
}

