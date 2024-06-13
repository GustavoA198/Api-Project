import { InsumosTransaccionModel } from '../models/insumosTransaccion.model.js'
import { validateInsumosTransaccion, validatePartialInsumosTransaccion } from '../schemas/insumosTransaccion.schema.js'
import { error, success, notFound } from '../utils/responses.js'

export class InsumosTransaccionController {
  static async getAll (req, res) {
    try {
      const [all] = await InsumosTransaccionModel.getAll()
      success(req, res, all, 200)
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async getInsumosTransaccion (req, res) {
    try {
      const [InsumosTransaccion] = await InsumosTransaccionModel.getInsumosTransaccionById(req.params.id)
      if (!InsumosTransaccion || InsumosTransaccion.length === 0) {
        notFound(req, res, `No se encontró ningun insumo transaccion con el ID ${req.params.id}`)
      } else {
        success(req, res, InsumosTransaccion, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async create (req, res) {
    const result = validateInsumosTransaccion(req.body)
    if (result.success) {
      try {
        const added = await InsumosTransaccionModel.create(result.data)
        success(req, res, added, 200)
      } catch (e) {
        error(req, res, e.message, e.status)
      }
    } else {
      error(req, res, JSON.parse(result.error.message), 400)
    }
  }

  static async update (req, res) {
    const result = validatePartialInsumosTransaccion(req.body)
    if (result.success) {
      try {
        const [updateResult] = await InsumosTransaccionModel.update(req.params.id, result.data)
        if (updateResult.affectedRows === 0 || updateResult.changedRows === 0) {
          notFound(req, res, `No se encontro ningun insumo transaccion con el ID ${req.params.id} para actualizar`)
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
      const [deleted] = await InsumosTransaccionModel.delete(req.params.id)
      if (deleted.affectedRows === 0) {
        notFound(req, res, `No se encontro ningun insumo transaccion con el ID ${req.params.id} para eliminar`)
      } else {
        success(req, res, deleted, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }
}
