import { ProductoModel } from '../models/producto.model.js'
import { validateProducto, validatePartialProducto } from '../schemas/producto.schema.js'
import { error, success, notFound } from '../utils/responses.js'

export class ProductoController {
  static async getAll (req, res) {
    try {
      const [all] = await ProductoModel.getAll()
      success(req, res, all, 200)
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async getProducto (req, res) {
    try {
      const [Producto] = await ProductoModel.getProducto(req.params.id)
      if (!Producto || Producto.length === 0) {
        notFound(req, res, `No se encontró ningún producto con el ID ${req.params.id}`)
      } else {
        success(req, res, Producto, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async create (req, res) {
    const result = validateProducto(req.body)
    if (result.success) {
      try {
        const added = await ProductoModel.create(result.data)
        success(req, res, added, 200)
      } catch (e) {
        error(req, res, e.message, e.status)
      }
    } else {
      error(req, res, JSON.parse(result.error.message), 400)
    }
  }

  static async update (req, res) {
    const result = validatePartialProducto(req.body)
    if (result.success) {
      try {
        const [updateResult] = await ProductoModel.update(req.params.id, result.data)
        if (updateResult.affectedRows === 0 || updateResult.changedRows === 0) {
          notFound(req, res, `No se encontro ningún producto con el ID ${req.params.id} para actualizar`)
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
      const deleted = await ProductoModel.delete(req.params.id)
      if (deleted.affectedRows === 0 || deleted.affectedRows === undefined) {
        notFound(req, res, `No se encontro ningún producto con el ID ${req.params.id} para eliminar`)
      } else {
        success(req, res, `Producto con ID ${req.params.id} eliminado`, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }
}
