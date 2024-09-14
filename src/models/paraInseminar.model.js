import { database } from '../database/db.js'

export class ParaInseminarModel {
  static async getAll () {
    return await database.query('SELECT * FROM paraInseminar')
  }

  static async getParaInseminar (id) {
    return await database.query('SELECT * FROM paraInseminar WHERE id = ?', [id])
  }

  static async create (data) {
    const { Fecha, Observaciones, ResID } = data
    const [[{ id }]] = await database.query('SELECT UUID() id')
    const result = await database.query(
      'INSERT INTO paraInseminar (ID, Fecha, Observaciones, ResID ) VALUES (?, ?, ?, ?)',
      [ id, Fecha, Observaciones, ResID ])
    return result
  }

  static async update (id, data) {
    const keys = Object.keys(data)
    const values = Object.values(data)
    let query = 'UPDATE paraInseminar SET '
    keys.forEach((key, index) => {
      query += `${key} = ?`
      if (index < keys.length - 1) {
        query += ', '
      }
    })
    query += ' WHERE ID = ?'
    values.push(id)
    return await database.query(query, values)
  }

  static async delete (id) {
    return await database.query('DELETE FROM paraInseminar WHERE ID = ?', [id])
  }
}
