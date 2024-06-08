import { AlimentoModel } from '../models/alimento.model.js'
import { validateAlimento, validatePartialAlimento } from '../schemas/alimento.schema.js'
import { error, success, notFound } from '../utils/responses.js'

export class AlimentoController {
  static async getAll (req, res) {
    try {
      const [all] = await AlimentoModel.getAlimentos()
      success(req, res, all, 200)
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async getAlimento (req, res) {
    try {
      const [Alimento] = await AlimentoModel.getAlimentoById(req.params.id)
      if (!Alimento || Alimento.length === 0) {
        notFound(req, res, `No se encontró ningún alimento con el ID ${req.params.id}`)
      } else {
        success(req, res, Alimento, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async create (req, res) {
    const result = validateAlimento(req.body)
    if (result.success) {
      try {
        const added = await AlimentoModel.createAlimento(result.data)
        success(req, res, added, 200)
      } catch (e) {
        error(req, res, e.message, e.status)
      }
    } else {
      error(req, res, JSON.parse(result.error.message), 400)
    }
  }

  static async update (req, res) {
    const result = validatePartialAlimento(req.body)
    if (result.success) {
      try {
        const [updateResult] = await AlimentoModel.updateAlimento(req.params.id, result.data)
        if (updateResult.affectedRows === 0 || updateResult.affectedRows === undefined) {
          notFound(req, res, `No se encontro ningún alimento con el ID ${req.params.id} para actualizar`)
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
      const [deleted] = await AlimentoModel.deleteAlimento(req.params.id)
      console.log(deleted)
      if (deleted.affectedRows === 0) {
        notFound(req, res, `No se encontro ningún alimento con el ID ${req.params.id} para eliminar`)
      } else {
        success(req, res, `Alimento con el ID ${req.params.id} eliminado correctamente`, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }
}
