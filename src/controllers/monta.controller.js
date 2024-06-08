import { MontaModel } from '../models/monta.model.js'
import { validateMonta, validatePartialMonta } from '../schemas/monta.schema.js'
import { error, success, notFound } from '../utils/responses.js'

export class MontaController {
  static async getAll (req, res) {
    try {
      const [all] = await MontaModel.getMontas()
      success(req, res, all, 200)
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async getMonta (req, res) {
    try {
      const [Monta] = await MontaModel.getMontaById(req.params.id)
      if (!Monta || Monta.length === 0) {
        notFound(req, res, `No se encontró ninguna monta con el ID ${req.params.id}`)
      } else {
        success(req, res, Monta, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async create (req, res) {
    const result = validateMonta(req.body)
    if (result.success) {
      try {
        const added = await MontaModel.createMonta(result.data)
        success(req, res, added, 200)
      } catch (e) {
        error(req, res, e.message, e.status)
      }
    } else {
      error(req, res, JSON.parse(result.error.message), 400)
    }
  }

  static async update (req, res) {
    const result = validatePartialMonta(req.body)
    if (result.success) {
      try {
        const [updateResult] = await MontaModel.updateMonta(req.params.id, result.data)
        if (updateResult.affectedRows === 0 || updateResult.affectedRows === undefined) {
          notFound(req, res, `No se encontro ninguna monta con el ID ${req.params.id} para actualizar`)
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
      const [deleted] = await MontaModel.deleteMonta(req.params.id)
      if (deleted.affectedRows === 0) {
        notFound(req, res, `No se encontro ninguna monta con el ID ${req.params.id} para borrar`)
      } else {
        success(req, res, `Monta con el ID ${req.params.id} borrada`, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }
}
