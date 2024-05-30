import { database } from '../database/db.js'

export class VentaModel {
  static async getAll () {
    return await database.execute('SELECT * FROM Venta')
  }

  static async getVenta (id) {
    return await database.execute('SELECT * FROM Venta WHERE id = ?', [id])
  }

  static async create (data) {
    const { Total, Observaciones, ClienteID } = data
    const [[{ id }]] = await database.query('SELECT UUID() id')
    const result = await database.execute(
      'INSERT INTO Venta (ID, Total, Observaciones, ClienteID) VALUES (?, ?, ?, ?)', [
        id, Total, Observaciones, ClienteID])
    return result
  }

  static async update (id, data) {
    const keys = Object.keys(data)
    const values = Object.values(data)
    let query = 'UPDATE Venta SET '
    keys.forEach((key, index) => {
      query += `${key} = ?`
      if (index < keys.length - 1) {
        query += ', '
      }
    })
    query += ' WHERE ID = ?'
    values.push(id)
    return await database.execute(query, values)
  }

  static async delete (id) {
    return await database.execute('DELETE FROM Venta WHERE ID = ?', [id])
  }
}
