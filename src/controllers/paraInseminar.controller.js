import { ParaInseminarModel } from '../models/paraInseminar.model.js'
import { validateParaInseminar } from '../schemas/paraInseminar.schema.js'
import { error, success, notFound } from '../utils/responses.js'

export class ParaInseminarController {
  static async getAll (req, res) {
    try {
      const [all] = await ParaInseminarModel.getAll()
      success(req, res, all, 200)
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async getParaInseminar (req, res) {
    try {
      const [ParaInseminar] = await ParaInseminarModel.getParaInseminar(req.params.id)
      if (!ParaInseminar || ParaInseminar.length === 0) {
        notFound(req, res, `No se encontró ningún registro con el ID ${req.params.id}`)
      } else {
        success(req, res, ParaInseminar, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async getSugeridos (req, res) {
    try {
      const [sugeridos] = await ParaInseminarModel.getSugeridos()
      success(req, res, sugeridos, 200)
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async create (req, res) {
    const result = validateParaInseminar(req.body)
    if (result.success) {
      try {
        const added = await ParaInseminarModel.create(result.data)
        success(req, res, added, 200)
      } catch (e) {
        error(req, res, e.message, e.status)
      }
    } else {
      error(req, res, JSON.parse(result.error.message), 400)
    }
  }

  static async update (req, res) {
    try {
      const [updateResult] = await ParaInseminarModel.update(req.params.id)
      if (updateResult.affectedRows === 0) {
        notFound(req, res, `No se encontro ningun registro con el ID ${req.params.id} para actualizar`)
      } else {
        success(req, res, updateResult, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async delete (req, res) {
    try {
      const [deleteResult] = await ParaInseminarModel.delete(req.params.id)
      if (deleteResult.affectedRows === 0) {
        notFound(req, res, `No se encontró ningún registro con el ID ${req.params.id} para eliminar`)
      } else {
        success(req, res, deleteResult, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }
}
