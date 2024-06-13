import { UsuarioModel } from '../models/usuario.model.js'
import { validateUsuario, validatePartialUsuario } from '../schemas/usuario.schema.js'
import { error, success, notFound } from '../utils/responses.js'

export class UsuarioController {
  static async getAll (req, res) {
    try {
      const [all] = await UsuarioModel.getAll()
      success(req, res, all, 200)
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async getUsuario (req, res) {
    try {
      const [Usuario] = await UsuarioModel.getUsuarioById(req.params.id)
      if (!Usuario || Usuario.length === 0) {
        notFound(req, res, `No se encontró ningun usuario con el ID ${req.params.id}`)
      } else {
        success(req, res, Usuario, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async create (req, res) {
    const result = validateUsuario(req.body)
    if (result.success) {
      try {
        const added = await UsuarioModel.create(result.data)
        success(req, res, added, 200)
      } catch (e) {
        error(req, res, e.message, e.status)
      }
    } else {
      error(req, res, JSON.parse(result.error.message), 400)
    }
  }

  static async update (req, res) {
    const result = validatePartialUsuario(req.body)
    if (result.success) {
      try {
        const [updateResult] = await UsuarioModel.update(req.params.id, result.data)
        if (updateResult.affectedRows === 0 || updateResult.affectedRows === undefined) {
          notFound(req, res, `No se encontro ningun usuario con el ID ${req.params.id} para actualizar`)
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
      const [deleted] = await UsuarioModel.delete(req.params.id)
      if (deleted.affectedRows === 0 || deleted.affectedRows === undefined) {
        notFound(req, res, `No se encontro ningun usuario con el ID ${req.params.id} para eliminar`)
      } else {
        success(req, res, deleted, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }
}
