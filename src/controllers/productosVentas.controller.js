import { ProductosVentasModel } from '../models/productosVentas.model.js'
import { validatePartialProductosVentas, validateProductosVentas } from '../schemas/productosVentas.schema.js'
import { error, success, notFound } from '../utils/responses.js'

export class ProductosVentasController {
  static async getAll (req, res) {
    try {
      const [all] = await ProductosVentasModel.getAll()
      success(req, res, all, 200)
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }
  static async getProductoVentas (req, res) {
    try {
      const [Producto] = await ProductosVentasModel.getProductosVentas(req.params.id)
      if (!Producto || Producto.length === 0) {
        notFound(req, res, `No se encontró ningún productoVenta con el ID ${req.params.id}`)
      } else {
        success(req, res, Producto, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async create (req, res) {
    const result = validateProductosVentas(req.body)
    if (result.success) {
      try {
        const added = await ProductosVentasModel.create(result.data)
        success(req, res, added, 200)
      } catch (e) {
        error(req, res, e.message, e.status)
      }
    } else {
      error(req, res, JSON.parse(result.error.message), 400)
    }
  }

  static async update (req, res) {
    const result = validatePartialProductosVentas(req.body)
    if (result.success) {
      try {
        const [updateResult] = await ProductosVentasModel.update(req.params.id, result.data)
        if (updateResult.affectedRows === 0 || updateResult.changedRows === 0) {
          notFound(req, res, `No se encontro ningún productoVenta con el ID ${req.params.id} para actualizar`)
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
      const [deleted] = await ProductosVentasModel.delete(req.params.id)
      if (deleted.affectedRows === 0 || deleted.affectedRows === undefined) {
        notFound(req, res, `No se encontro ningún productoVenta con el ID ${req.params.id} para eliminar`)
      } else {
        success(req, res, `ProductoVenta con ID ${req.params.id} eliminado`, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }
}
