import { ClienteModel } from '../models/cliente.model.js'
import { validateCliente, validatePartialCliente } from '../schemas/cliente.schema.js'
import { error, success, notFound } from '../utils/responses.js'

export class ClienteController {
  static async getAll (req, res) {
    try {
      const [all] = await ClienteModel.getAll()
      success(req, res, all, 200)
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async getCliente (req, res) {
    try {
      const [Cliente] = await ClienteModel.getCliente(req.params.id)
      if (!Cliente || Cliente.length === 0) {
        notFound(req, res, `No se encontró ningún cliente con el ID ${req.params.id}`)
      } else {
        success(req, res, Cliente, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async create (req, res) {
    const result = validateCliente(req.body)
    if (result.success) {
      try {
        const added = await ClienteModel.create(result.data)
        success(req, res, added, 200)
      } catch (e) {
        error(req, res, e.message, e.status)
      }
    } else {
      error(req, res, JSON.parse(result.error.message), 400)
    }
  }

  static async update (req, res) {
    const result = validatePartialCliente(req.body)
    if (result.success) {
      try {
        const [updateResult] = await ClienteModel.update(req.params.id, result.data)
        if (updateResult.affectedRows === 0) {
          notFound(req, res, `No se encontro ningun cliente con el ID ${req.params.id} para actualizar`)
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
      const [deleteResult] = await ClienteModel.delete(req.params.id)
      if (deleteResult.affectedRows === 0) {
        notFound(req, res, `No se encontró ningún cliente con el ID ${req.params.id} para eliminar`)
      } else {
        success(req, res, deleteResult, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }
}
