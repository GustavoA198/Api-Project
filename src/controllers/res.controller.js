import { ResModel } from '../models/res.model.js'
import { validateRes } from '../schemas/res.schema.js'
import { error, success } from '../utils/responses.js'

export class ResController {
  static async create (req, res) {
    const result = validateRes(req.body)
    if (result.success) {
      try {
        const added = await ResModel.create(result.data)
        success(req, res, added, 200)
      } catch (e) {
        error(req, res, e.message, e.status)
      }
    } else {
      error(req, res, JSON.parse(result.error.message), 400)
    }
  }

  static async getAll (req, res) {
    try {
      const [all] = await ResModel.getAll()
      success(req, res, all, 200)
    } catch (e) {
      error(req, res, e.message, e.status)
    }
  }
}
