import { ServicioModel } from '../models/servicio.model.js'
import { validateServicio, validatePartialServicio } from '../schemas/servicio.schema.js'
import { error, success, notFound, notContent } from '../utils/responses.js'

export class ServicioController {
  static async getAll (req, res) {
    try {
      const all = await ServicioModel.getServicios()
      success(req, res, all, 200)
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async getAllInseminacionOMonta (req, res) {
    try {
      const all = await ServicioModel.getInseminacionOMonta()
      success(req, res, all, 200)
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async getAllSecado (req, res) {
    try {
      const all = await ServicioModel.getSecado()
      success(req, res, all, 200)
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async getServicio (req, res) {
    try {
      const Servicio = await ServicioModel.getServicioById(req.params.id)
      if (!Servicio || Servicio.length === 0) {
        notContent(req, res, `No se encontró ningun servicio con el ID ${req.params.id}`)
      } else {
        success(req, res, Servicio, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async getServicioByIdRes (req, res) {
    try {
      const Servicio = await ServicioModel.getServicioByIdRes(req.params.id)
      if (!Servicio || Servicio.length === 0) {
        notContent(req, res, `No se encontró ningun servicio con el ID  de la res${req.params.id}`)
      } else {
        success(req, res, Servicio, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async getInseminacionOMontaById (req, res) {
    try {
      const Servicio = await ServicioModel.getInseminacionOMontaById(req.params.id)
      if (!Servicio || Servicio.length === 0) {
        notContent(req, res, `No se encontró ningun servicio de inseminación o monta con el ID ${req.params.id}`)
      } else {
        success(req, res, Servicio, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async getInseminacionOMontaByIdRes (req, res) {
    try {
      const Servicio = await ServicioModel.getInseminacionOMontaByIdRes(req.params.id)
      if (!Servicio || Servicio.length === 0) {
        notContent(req, res, `No se encontró ningun servicio de inseminación o monta con el ID  de la res${req.params.id}`)
      } else {
        success(req, res, Servicio, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async getSecadoByIdRes (req, res) {
    try {
      const Servicio = await ServicioModel.getSecadoByIdRes(req.params.id)
      if (!Servicio || Servicio.length === 0) {
        notContent(req, res, `No se encontró ningun servicio de secado con el ID  de la res${req.params.id}`)
      } else {
        success(req, res, Servicio, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }

  static async create (req, res) {
    const result = validateServicio(req.body)
    if (result.success) {
      try {
        const added = await ServicioModel.createServicio(result.data)
        success(req, res, added, 200)
      } catch (e) {
        error(req, res, e.message, e.status)
      }
    } else {
      error(req, res, JSON.parse(result.error.message), 400)
    }
  }

  static async update (req, res) {
    const result = validatePartialServicio(req.body)
    if (result.success) {
      try {
        const [updateResult] = await ServicioModel.updateServicio(req.params.id, result.data)
        if (updateResult.affectedRows === 0 || updateResult.affectedRows === undefined) {
          notFound(req, res, `No se encontro ningun servicio con el ID ${req.params.id} para actualizar`)
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
      const [deleted] = await ServicioModel.deleteServicio(req.params.id)
      if (deleted.affectedRows === 0 || deleted.affectedRows === undefined) {
        notFound(req, res, `No se encontro ningun servicio con el ID ${req.params.id} para eliminar`)
      } else {
        success(req, res, deleted, 200)
      }
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }
}
