import { database } from '../database/db.js'

export class FincaModel {
  static async getAll () {
    return await database.query('SELECT * FROM Finca')
  }

  static async getFinca (id) {
    return await database.query('SELECT * FROM Finca WHERE ID = ?', [id])
  }

  static async create (data) {
    const { Nombre, Direccion, Observaciones } = data
    const [[{id}]] = await database.query('SELECT UUID() id')
    const result = await database.query(
      'INSERT INTO Finca (ID, Nombre, Direccion, Observaciones) VALUES (?, ?, ?, ?)', [
        id, Nombre, Direccion, Observaciones])
    return result
  }

  static async update (id, data) {
    const keys = Object.keys(data)
    const values = Object.values(data)
    let query = 'UPDATE Finca SET '
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
    return await database.query('DELETE FROM Finca WHERE ID = ?', [id])
  }
}
