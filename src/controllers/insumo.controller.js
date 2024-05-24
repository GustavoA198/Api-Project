import { InsumoModel } from '../models/insumo.model.js'
import { validateInsumo, validatePartialInsumo } from '../schemas/insumo.schema.js'
import { error, success, notFound } from '../utils/responses.js'

export class InsumoController {
  static async getAll (req, res) {
    try {
      const [all] = await InsumoModel.getAll()
      success(req, res, all, 200)
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async getInsumo (req, res) {
    try {
      const [Insumo] = await InsumoModel.getInsumo(req.params.id)
      if (!Insumo || Insumo.length === 0) {
        notFound(req, res, `No se encontró ningún insumo con el ID ${req.params.id}`)
      } else {
        success(req, res, Insumo, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async create (req, res) {
    const result = validateInsumo(req.body)
    if (result.success) {
      try {
        const added = await InsumoModel.create(result.data)
        success(req, res, added, 200)
      } catch (e) {
        error(req, res, e.message, e.status)
      }
    } else {
      error(req, res, JSON.parse(result.error.message), 400)
    }
  }

  static async update (req, res) {
    const result = validatePartialInsumo(req.body)
    if (result.success) {
      try {
        const [updateResult] = await InsumoModel.update(req.params.id, result.data)
        if (updateResult.affectedRows === 0) {
          notFound(req, res, `No se encontro ningún insumo con el ID ${req.params.id} para actualizar`)
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
      const [deleted] = await InsumoModel.delete(req.params.id)
      if (deleted.affectedRows === 0 || deleted.affectedRows === undefined) {
        notFound(req, res, `No se encontro ningún insumo con el ID ${req.params.id} para eliminar`)
      } else {
        success(req, res, deleted, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }
}
