import { ResModel } from '../models/res.model.js'
import { validateRes, validatePartialRes } from '../schemas/res.schema.js'
import { error, success, notFound } from '../utils/responses.js'

export class ResController {
  static async getAll (req, res) {
    try {
      const [all] = await ResModel.getAll()
      success(req, res, all, 200)
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async getRes (req, res) {
    try {
      const [Res] = await ResModel.getRes(req.params.id)
      if (!Res || Res.length === 0) {
        notFound(req, res, `No se encontró ninguna 'res' con el ID ${req.params.id}`)
      } else {
        success(req, res, Res, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async create (req, res) {
    const result = validateRes(req.body)
    if (result.success) {
      try {
        const added = await ResModel.create(result.data)
        success(req, res, added, 200)
      } catch (e) {
        error(req, res, e.message, e.status)
      }
    } else {
      error(req, res, JSON.parse(result.error.message), 400)
    }
  }

  static async update (req, res) {
    const result = validatePartialRes(req.body)
    if (result.success) {
      try {
        const [updateResult] = await ResModel.update(req.params.id, result.data)
        if (updateResult.affectedRows === 0) {
          notFound(req, res, `No se encontró ninguna 'res' con el ID ${req.params.id} para actualizar`)
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
      const [deleteResult] = await ResModel.delete(req.params.id)
      if (deleteResult.affectedRows === 0 || deleteResult.affectedRows === undefined) {
        notFound(req, res, `No se encontró ninguna 'res' con el ID ${req.params.id} para eliminar`)
      } else {
        success(req, res, deleteResult, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }
}
