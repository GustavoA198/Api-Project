import { TransaccionModel } from '../models/transaccion.model.js'
import { validateTransaccion, validatePartialTransaccion } from '../schemas/transaccion.schema.js'
import { error, success, notFound } from '../utils/responses.js'

export class TransaccionController {
  static async getAll (req, res) {
    try {
      const [all] = await TransaccionModel.getAll()
      success(req, res, all, 200)
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async getTransaccion (req, res) {
    try {
      const [Transaccion] = await TransaccionModel.getTransaccionById(req.params.id)
      if (!Transaccion || Transaccion.length === 0) {
        notFound(req, res, `No se encontró ninguna transaccion con el ID ${req.params.id}`)
      } else {
        success(req, res, Transaccion, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async create (req, res) {
    const result = validateTransaccion(req.body)
    if (result.success) {
      try {
        const added = await TransaccionModel.create(result.data)
        success(req, res, added, 200)
      } catch (e) {
        error(req, res, e.message, e.status)
      }
    } else {
      error(req, res, JSON.parse(result.error.message), 400)
    }
  }

  static async update (req, res) {
    const result = validatePartialTransaccion(req.body)
    if (result.success) {
      try {
        const [updateResult] = await TransaccionModel.update(req.params.id, result.data)
        if (updateResult.affectedRows === 0 || updateResult.changedRows === 0) {
          notFound(req, res, `No se encontro ninguna transaccion con el ID ${req.params.id} para actualizar`)
        } else {
          success(req, res, updateResult, 200)
        }
      } catch (e) {
        error(req, res, e.message, e.status)
      }
    }
  }

  static async delete (req, res) {
    try {
      const [deleted] = await TransaccionModel.delete(req.params.id)
      if (deleted.affectedRows === 0) {
        notFound(req, res, `No se encontro ninguna transaccion con el ID ${req.params.id} para eliminar`)
      } else {
        success(req, res, deleted, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }
}
