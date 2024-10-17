import { ProveedorModel } from '../models/proveedor.model.js'
import { validateProveedor, validatePartialProveedor } from '../schemas/proveedor.schema.js'
import { error, success, notFound } from '../utils/responses.js'

export class ProveedorController {
  static async getAll (req, res) {
    try {
      const [all] = await ProveedorModel.getAll()
      success(req, res, all, 200)
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async getProveedor (req, res) {
    try {
      const [Proveedor] = await ProveedorModel.getProveedor(req.params.id)
      if (!Proveedor || Proveedor.length === 0) {
        notFound(req, res, `No se encontró ningún proveedor con el ID ${req.params.id}`)
      } else {
        success(req, res, Proveedor, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async create (req, res) {
    const result = validateProveedor(req.body)
    if (result.success) {
      try {
        const added = await ProveedorModel.create(result.data)
        success(req, res, added, 200)
      } catch (e) {
        error(req, res, e.message, e.status)
      }
    } else {
      error(req, res, JSON.parse(result.error.message), 400)
    }
  }

  static async update (req, res) {
    const result = validatePartialProveedor(req.body)
    if (result.success) {
      try {
        const [updateResult] = await ProveedorModel.update(req.params.id, result.data)
        if (updateResult.affectedRows === 0) {
          notFound(req, res, `No se encontro ningun proveedor con el ID ${req.params.id} para actualizar`)
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
      const [deleteResult] = await ProveedorModel.delete(req.params.id)
      if (deleteResult.affectedRows === 0) {
        notFound(req, res, `No se encontró ningún proveedor con el ID ${req.params.id} para eliminar`)
      } else {
        success(req, res, deleteResult, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }
}
