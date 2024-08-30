import { MuerteModel } from '../models/muerte.model.js'
import { ResModel } from '../models/res.model.js'
import { validateMuerte, validatePartialMuerte } from '../schemas/muerte.schema.js'
import { error, success, notFound } from '../utils/responses.js'

export class MuerteController {
  static async getAll (req, res) {
    try {
      const [all] = await MuerteModel.getMuertes()
      success(req, res, all, 200)
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async getMuerte (req, res) {
    try {
      const [Muerte] = await MuerteModel.getMuerteById(req.params.id)
      if (!Muerte || Muerte.length === 0) {
        notFound(req, res, `No se encontró ninguna muerte con el ID ${req.params.id}`)
      } else {
        success(req, res, Muerte, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async create (req, res) {
    const result = validateMuerte(req.body)
    if (result.success) {
      try {
        const [updateResult] = await ResModel.delete(req.body.ResID)
        if (updateResult.affectedRows === 0 || updateResult.affectedRows === undefined) {
          notFound(req, res, `No se encontró ninguna 'res' con el ID ${req.body.ResID} para actualizar`)
        } else {
          const [added] = await MuerteModel.createMuerte(req.body)
          if (updateResult.affectedRows === 0 || updateResult.affectedRows === undefined) {
            notFound(req, res, `No se encontró ninguna 'res' con el ID ${req.body.ResID} para actualizar`)
          }
          success(req, res, added, 200)
        }
      } catch (e) {
        error(req, res, e.message, e.status)
      }
    } else {
      error(req, res, JSON.parse(result.error.message), 400)
    }
  }

  static async update (req, res) {
    const result = validatePartialMuerte(req.body)
    if (result.success) {
      try {
        const [updateResult] = await MuerteModel.updateMuerte(req.params.id, result.data)
        if (updateResult.affectedRows === 0 || updateResult.affectedRows === undefined) {
          notFound(req, res, `No se encontro ninguna muerte con el ID ${req.params.id} para actualizar`)
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
      const [deleteResult] = await MuerteModel.deleteMuerte(req.params.id)
      if (deleteResult.affectedRows === 0) {
        notFound(req, res, `No se encontro ninguna muerte con el ID ${req.params.id} para eliminar`)
      } else {
        success(req, res, `Muerte con el ID ${req.params.id} eliminada`, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }
}
