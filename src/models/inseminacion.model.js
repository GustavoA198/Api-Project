import { database } from '../database/db.js'

export class InseminacionModel {
  static async getInseminaciones () {
    return await database.query('SELECT * FROM Inseminacion')
  }

  static async getInseminacionById (id) {
    return await database.query('SELECT * FROM Inseminacion WHERE id = ?', [id])
  }

  static async createInseminacion (data) {
    const { FechaParto, ServicioID } = data
    const [[{ id }]] = await database.query('SELECT UUID() id')
    const result = await database.query('INSERT INTO Inseminacion (id, FechaParto, ServicioID) VALUES (?, ?, ?)',
      [id, FechaParto, ServicioID])
    return result
  }

  static async updateInseminacion (id, data) {
    const keys = Object.keys(data)
    const values = Object.values(data)
    let query = 'UPDATE Inseminacion SET '
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

  static async deleteInseminacion (id) {
    return await database.query('DELETE FROM Inseminacion WHERE id = ?', [id])
  }
}
