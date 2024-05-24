import { database } from '../database/db.js'

export class LoteModel {
  static async getAll () {
    return await database.query('SELECT * FROM Lote')
  }

  static async getLote (id) {
    return await database.query('SELECT * FROM Lote WHERE ID = ?', [id])
  }

  static async create (data) {
    const { Nombre, Numero, Aforo, FincaID } = data
    const [[{id}]] = await database.query('SELECT UUID() id')
    const result = await database.query(
      'INSERT INTO Lote (ID, Nombre, Numero, Aforo, FincaID) VALUES (?, ?, ?, ?, ?)', [
        id, Nombre, Numero, Aforo, FincaID])
    return result
  }

  static async update (id, data) {
    const keys = Object.keys(data)
    const values = Object.values(data)
    let query = 'UPDATE Lote SET '
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
    return await database.query('DELETE FROM Lote WHERE ID = ?', [id])
  }
}
