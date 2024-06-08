import { database } from '../database/db.js'

export class MuerteModel {
  static async getMuertes () {
    return await database.query('SELECT * FROM Muerte')
  }

  static async getMuerteById (id) {
    return await database.query('SELECT * FROM Muerte WHERE id = ?', [id])
  }

  static async createMuerte (data) {
    const {Fecha, Causa, Observaciones, ResID} = data
    const [[{id}]] = await database.query('SELECT UUID() id')
    const result = await database.query('INSERT INTO Muerte (id, Fecha, Causa, Observaciones, ResID) VALUES (?, ?, ?, ?, ?)',
      [id, Fecha, Causa, Observaciones, ResID])
    return result
  }

  static async updateMuerte (id, data) {
    const keys = Object.keys(data)
    const values = Object.values(data)
    let query = 'UPDATE Muerte SET '
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

  static async deleteMuerte (id) {
    return await database.query('DELETE FROM Muerte WHERE id = ?', [id])
  }
}
