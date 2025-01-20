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

  static async getProduccionIndividualByFecha (req, res) {
    try {
      const [ProduccionIndividual] = await ProduccionIndividualModel.getProduccionIndividualByFecha(req.params.id, req.params.FechaInicio, req.params.FechaFin)
      if (!ProduccionIndividual || ProduccionIndividual.length === 0) {
        notFound(req, res, `No se encontró ninguna produccion entre las fechas ${req.params.FechaInicio} y ${req.params.FechaFin}`)
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
      const { data } = result
      const ListResID = data.ResID
      const Fecha = data.Fecha
      const Tipo = data.Tipo
      const Cantidad = data.Cantidad / ListResID.length

      try {
        let listAdded = []
        for (const ResID of ListResID) {
          const added = await ProduccionIndividualModel.createProduccionIndividual({ Fecha, Tipo, Cantidad, ResID })
          listAdded.push(added)
        }
        success(req, res, listAdded, 200)
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
