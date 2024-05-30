import { database } from '../database/db.js'

export class ProductoModel {
  static async getAll () {
    return await database.execute('SELECT * FROM Producto')
  }

  static async getProducto (id) {
    return await database.execute('SELECT * FROM Producto WHERE ID = ?', [id])
  }

  static async create (data) {
    const { Nombre, Fecha, Cantidad } = data
    const [[{id}]] = await database.query('SELECT UUID() id')
    const result = await database.execute(
      'INSERT INTO Producto (ID, Nombre, Fecha, Cantidad) VALUES (?, ?, ?, ?)', [
        id, Nombre, Fecha, Cantidad])
    return result
  }

  static async update (id, data) {
    const keys = Object.keys(data)
    const values = Object.values(data)
    let query = 'UPDATE Producto SET '
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
    return await database.execute('DELETE FROM Producto WHERE ID = ?', [id])
  }
}
