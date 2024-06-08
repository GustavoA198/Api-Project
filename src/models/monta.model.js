import { database } from '../database/db.js'

export class MontaModel {
  static async getMontas () {
    return await database.query('SELECT * FROM Monta')
  }

  static async getMontaById (id) {
    return await database.query('SELECT * FROM Monta WHERE id = ?', [id])
  }

  static async createMonta (data) {
    const { FechaParto, ServicioID, ToroID } = data
    const [[{ id }]] = await database.query('SELECT UUID() id')
    const result = await database.query('INSERT INTO Monta (id, FechaParto, ServicioID, ToroID) VALUES (?, ?, ?, ?)',
      [id, FechaParto, ServicioID, ToroID])
    return result
  }

  static async updateMonta (id, data) {
    const keys = Object.keys(data)
    const values = Object.values(data)
    let query = 'UPDATE Monta SET '
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

  static async deleteMonta (id) {
    return await database.query('DELETE FROM Monta WHERE id = ?', [id])
  }
}
