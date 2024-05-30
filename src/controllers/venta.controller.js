import { VentaModel } from '../models/venta.model.js'
import { validatePartialVenta, validateVenta } from '../schemas/venta.schema.js'
import { error, success, notFound } from '../utils/responses.js'

export class VentaController {
  static async getAll (req, res) {
    try {
      const [all] = await VentaModel.getAll()
      success(req, res, all, 200)
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async getVenta (req, res) {
    try {
      const [venta] = await VentaModel.getVenta(req.params.id)
      if (!venta || venta.length === 0) {
        notFound(req, res, `No se encontró ninguna 'venta' con el ID ${req.params.id}`)
      } else {
        success(req, res, venta, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async create (req, res) {
    const result = validateVenta(req.body)
    if (result.success) {
      try {
        const added = await VentaModel.create(result.data)
        success(req, res, added, 200)
      } catch (e) {
        error(req, res, e.message, e.status)
      }
    } else {
      error(req, res, JSON.parse(result.error.message), 400)
    }
  }

  static async update (req, res) {
    const result = validatePartialVenta(req.body)
    if (result.success) {
      try {
        const [updateResult] = await VentaModel.update(req.params.id, result.data)
        if (updateResult.affectedRows === 0 || updateResult.affectedRows === undefined) {
          notFound(req, res, `No se encontró ninguna 'venta' con el ID ${req.params.id} para actualizar`)
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
      const [deleteResult] = await VentaModel.delete(req.params.id)
      if (deleteResult.affectedRows === 0 || deleteResult.affectedRows === undefined) {
        notFound(req, res, `No se encontró ninguna 'venta' con el ID ${req.params.id} para eliminar`)
      } else {
        success(req, res, deleteResult, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }
}
