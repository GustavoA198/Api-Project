import { ProduccionIndividualModel } from '../models/produccionIndividual.model.js'
import { validateProduccionIndividual, validatePartialProduccionIndividual } from '../schemas/produccionIndividual.schema.js'
import { error, success, notFound } from '../utils/responses.js'

export class ProduccionIndividualController {
  static async getAll (req, res) {
    try {
      const [all] = await ProduccionIndividualModel.getProduccionIndividuals()
      success(req, res, all, 200)
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async getProduccionIndividual (req, res) {
    try {
      const [ProduccionIndividual] = await ProduccionIndividualModel.getProduccionIndividualById(req.params.id)
      if (!ProduccionIndividual || ProduccionIndividual.length === 0) {
        notFound(req, res, `No se encontró ninguna produccion individual con el ID ${req.params.id}`)
      } else {
        success(req, res, ProduccionIndividual, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async create (req, res) {
    const result = validateProduccionIndividual(req.body)
    if (result.success) {
      try {
        const added = await ProduccionIndividualModel.createProduccionIndividual(result.data)
        success(req, res, added, 200)
      } catch (e) {
        error(req, res, e.message, e.status)
      }
    } else {
      error(req, res, JSON.parse(result.error.message), 400)
    }
  }

  static async update (req, res) {
    const result = validatePartialProduccionIndividual(req.body)
    if (result.success) {
      try {
        const [updateResult] = await ProduccionIndividualModel.updateProduccionIndividual(req.params.id, result.data)
        if (updateResult.affectedRows === 0 || updateResult.affectedRows === undefined) {
          notFound(req, res, `No se encontro ninguna produccion individual con el ID ${req.params.id} para actualizar`)
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
      const [deleted] = await ProduccionIndividualModel.deleteProduccionIndividual(req.params.id)
      if (deleted.affectedRows === 0 || deleted.affectedRows === undefined) {
        notFound(req, res, `No se encontro ninguna produccion individual con el ID ${req.params.id} para eliminar`)
      } else {
        success(req, res, deleted, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }
}
