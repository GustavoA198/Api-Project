import { UsoModel } from '../models/uso.model.js'
import { validateUso, validatePartialUso } from '../schemas/uso.schema.js'
import { error, success, notFound } from '../utils/responses.js'

export class UsoController {
  static async getAll (req, res) {
    try {
      const [all] = await UsoModel.getAll()
      success(req, res, all, 200)
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async getUsoById (req, res) {
    try {
      const [Uso] = await UsoModel.getUsoById(req.params.id)
      if (!Uso || Uso.length === 0) {
        notFound(req, res, `No se encontró ninguna 'uso' con el ID ${req.params.id}`)
      } else {
        success(req, res, Uso, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async getUsoByIdServicio (req, res) {
    try {
      const [Uso] = await UsoModel.getUsoByIdServicio(req.params.id)
      if (!Uso || Uso.length === 0) {
        notFound(req, res, `No se encontró ninguna 'uso' con el ResID ${req.params.id}`)
      } else {
        success(req, res, Uso, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async create (req, res) {
    const result = validateUso(req.body)
    if (result.success) {
      try {
        const added = await UsoModel.create(result.data)
        success(req, res, added, 200)
      } catch (e) {
        error(req, res, e.message, e.status)
      }
    } else {
      error(req, res, JSON.parse(result.error.message), 400)
    }
  }

  static async update (req, res) {
    const result = validatePartialUso(req.body)
    if (result.success) {
      try {
        const [updateResult] = await UsoModel.update(req.params.id, result.data)
        if (updateResult.affectedRows === 0 || updateResult.changedRows === null) {
          notFound(req, res, `No se encontró ninguna 'uso' con el ID ${req.params.id} para actualizar`)
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
      const [deleted] = await UsoModel.delete(req.params.id)
      if (deleted.affectedRows === 0) {
        notFound(req, res, `No se encontró ninguna 'uso' con el ID ${req.params.id} para eliminar`)
      } else {
        success(req, res, deleted, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }
}
