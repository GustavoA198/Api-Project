import { FincaModel } from '../models/finca.model.js'
import { validateFinca, validatePartialFinca } from '../schemas/finca.schema.js'
import { error, success, notFound } from '../utils/responses.js'

export class FincaController {
  static async getAll (req, res) {
    try {
      const [all] = await FincaModel.getAll()
      success(req, res, all, 200)
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async getFinca (req, res) {
    try {
      const [Finca] = await FincaModel.getFinca(req.params.id)
      if (!Finca || Finca.length === 0) {
        notFound(req, res, `No se encontró ninguna finca con el ID ${req.params.id}`)
      } else {
        success(req, res, Finca, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async create (req, res) {
    const result = validateFinca(req.body)
    if (result.success) {
      try {
        const added = await FincaModel.create(result.data)
        success(req, res, added, 200)
      } catch (e) {
        error(req, res, e.message, e.status)
      }
    } else {
      error(req, res, JSON.parse(result.error.message), 400)
    }
  }

  static async update (req, res) {
    const result = validatePartialFinca(req.body)
    if (result.success) {
      try {
        const [updateResult] = await FincaModel.update(req.params.id, result.data)
        if (updateResult.affectedRows === 0) {
          notFound(req, res, `No se encontro ninguna finca con el ID ${req.params.id} para actualizar`)
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
      const [deleteResult] = await FincaModel.delete(req.params.id)
      if (deleteResult.affectedRows === 0) {
        notFound(req, res, `No se encontro ninguna finca con el ID ${req.params.id} para eliminar`)
      } else {
        success(req, res, deleteResult, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }
}
