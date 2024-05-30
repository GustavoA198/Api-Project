import { OcupacionModel } from '../models/ocupacion.model.js'
import { validateOcupacion, validatePartialOcupacion } from '../schemas/ocupacion.schema.js'
import { error, success, notFound } from '../utils/responses.js'

export class OcupacionController {
  static async getAll (req, res) {
    try {
      const [all] = await OcupacionModel.getAll()
      success(req, res, all, 200)
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async getOcupacion (req, res) {
    try {
      const [Ocupacion] = await OcupacionModel.getOcupacion(req.params.id)
      if (!Ocupacion || Ocupacion.length === 0) {
        notFound(req, res, `No se encontró ninguna ocupación con el ID ${req.params.id}`)
      } else {
        success(req, res, Ocupacion, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async create (req, res) {
    const result = validateOcupacion(req.body)
    if (result.success) {
      try {
        const added = await OcupacionModel.create(result.data)
        success(req, res, added, 200)
      } catch (e) {
        error(req, res, e.message, e.status)
      }
    } else {
      error(req, res, JSON.parse(result.error.message), 400)
    }
  }

  static async update (req, res) {
    const result = validatePartialOcupacion(req.body)
    if (result.success) {
      try {
        const [updateResult] = await OcupacionModel.update(req.params.id, result.data)
        if (updateResult.affectedRows === 0) {
          notFound(req, res, `No se encontro ninguna ocupación con el ID ${req.params.id} para actualizar`)
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
      const [deleteResult] = await OcupacionModel.delete(req.params.id)
      if (deleteResult.affectedRows === 0 || deleteResult.affectedRows === undefined) {
        notFound(req, res, `No se encontro ninguna ocupación con el ID ${req.params.id} para eliminar`)
      } else {
        success(req, res, deleteResult, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }
}
