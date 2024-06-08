import { database } from '../database/db.js'

export class AlimentoModel {
  static async getAlimentos () {
    return await database.query('SELECT * FROM alimento')
  }

  static async getAlimentoById (id) {
    return await database.query('SELECT * FROM alimento WHERE id = ?', [id])
  }

  static async createAlimento (data) {
    const {Nombre, Tipo} = data
    const [[{id}]] = await database.query('SELECT UUID() id')
    const result = await database.query('INSERT INTO alimento (id, Nombre, Tipo) VALUES (?, ?, ?)', [id, Nombre, Tipo])
    return result
  }

  static async updateAlimento (id, data) {
    const keys = Object.keys(data)
    const values = Object.values(data)
    let query = 'UPDATE alimento SET '
    keys.forEach((key, index) => {
      query += `${key} = ?`
      if (index < keys.length - 1) {
        query += ', '
      }
    })
    query += ' WHERE id = ?'
    values.push(id)
    return await database.query(query, values)
  }

  static async deleteAlimento (id) {
    return await database.query('DELETE FROM alimento WHERE id = ?', [id])
  }
}
