import { ActividadModel } from '../models/Actividad.model.js'
import { validateActividad, validatePartialActividad } from '../schemas/actividad.schema.js'
import { error, success, notFound } from '../utils/responses.js'

export class ActividadController {
  static async getAll (req, res) {
    try {
      const [all] = await ActividadModel.getAll()
      success(req, res, all, 200)
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async getActividad (req, res) {
    try {
      const [Actividad] = await ActividadModel.getActividad(req.params.id)
      if (!Actividad || Actividad.length === 0) {
        notFound(req, res, `No se encontró ninguna actividad con el ID ${req.params.id}`)
      } else {
        success(req, res, Actividad, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async create (req, res) {
    const result = validateActividad(req.body)
    if (result.success) {
      try {
        const added = await ActividadModel.create(result.data)
        success(req, res, added, 200)
      } catch (e) {
        error(req, res, e.message, e.status)
      }
    } else {
      error(req, res, JSON.parse(result.error.message), 400)
    }
  }

  static async update (req, res) {
    const result = validatePartialActividad(req.body)
    if (result.success) {
      try {
        const [updateResult] = await ActividadModel.update(req.params.id, result.data)
        if (updateResult.affectedRows === 0) {
          notFound(req, res, `No se encontro ninguna actividad con el ID ${req.params.id} para actualizar`)
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
      const deleted = await ActividadModel.delete(req.params.id)
      console.log(deleted.affectedRows)
      if (deleted.affectedRows === 0 || deleted.affectedRows === undefined) {
        console.log(1)
        notFound(req, res, `No se encontro ninguna actividad con el ID ${req.params.id} para eliminar`)
      } else {
        console.log(2)
        success(req, res, deleted, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }
}
